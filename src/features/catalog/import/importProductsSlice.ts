import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Papa from 'papaparse';
import { supabase } from '@/utils/supabaseClient';

// You can replace this with your own typing based on the CSV structure.
interface CSVRow {
    ProductName: string;
    Category: string;
    SousCategory?: string;
    PriceHt: string;
    PriceTtc: string;
    Brand: string;
    Manufacturer: string;
    Size?: string;
    Color?: string;
    Weight?: string;
    Laterality?: string;
    Material?: string;
    Height?: string;
    Width?: string;
    Image?: string;
}

export const importCSV = createAsyncThunk(
    'products/importCSV',
    async (file: File, { rejectWithValue }) => {
        return new Promise((resolve, reject) => {
            Papa.parse<CSVRow>(file, {
                header: true,
                complete: async (results) => {
                    if (results.errors.length > 0) {
                        return rejectWithValue(results.errors);
                    }

                    try {
                        // Here we store the product and its variants that have been inserted
                        // to prevent duplications
                        const insertedProducts: Record<string, number> = {};

                        for (const row of results.data) {
                            // Check if product is already inserted
                            let productId = insertedProducts[row.ProductName];

                            if (!productId) {
                                // Insert product into products table
                                const productInsertResult = await supabase
                                    .from('products')
                                    .insert([{ name: row.ProductName }]);

                                if (productInsertResult.error) {
                                    throw productInsertResult.error;
                                }

                                if(productInsertResult.data){
                                        productId = productInsertResult.data[0].product_id;
                                        insertedProducts[row.ProductName] = productId;
                                }

                                
                            }

                            // Insert variant into variants table
                            const variantData = {
                                product_id: productId,
                                name: `${row.Size}-${row.Color}`, // Modify the variant name as per your requirement
                            };

                            const variantInsertResult = await supabase
                                .from('variants')
                                .insert([variantData])
                                .single();

                            if (variantInsertResult.error) {
                                throw variantInsertResult.error;
                            }

                            const variantId = variantInsertResult.data.variant_id;

                            // Insert variant properties into properties table and variant_properties table
                            const variantProperties = [

                                { name: 'Category', value: row.Category },
                                { name: 'SousCategory', value: row.SousCategory },
                                { name: 'Size', value: row.Size },
                                { name: 'Color', value: row.Color },
                                { name: 'Weight', value: row.Weight },
                                { name: 'Laterality', value: row.Laterality },
                                { name: 'Material', value: row.Material },
                                { name: 'Height', value: row.Height },
                                { name: 'Width', value: row.Width },
                                { name: 'Image', value: row.Image },
                                { name: 'Brand', value: row.Brand },
                                { name: 'Manufacturer', value: row.Manufacturer },
                            ];

                            for (const property of variantProperties) {
                                // Check if property exists
                                const existingPropertyResult = await supabase
                                    .from('properties')
                                    .select('property_id')
                                    .eq('name', property.name)
                                    .eq('value', property.value)
                                    .single();

                                if (existingPropertyResult.error) {
                                    throw existingPropertyResult.error;
                                }

                                let propertyId = existingPropertyResult.data?.property_id;

                                // Insert property if it doesn't exist
                                if (!propertyId) {
                                    const propertyInsertResult = await supabase
                                        .from('properties')
                                        .insert([{ name: property.name, value: property.value }])
                                        .single();

                                    if (propertyInsertResult.error) {
                                        throw propertyInsertResult.error;
                                    }

                                    propertyId = propertyInsertResult.data.property_id;
                                }

                                // Insert into variant_properties table
                                const variantPropertyData = {
                                    variant_id: variantId,
                                    property_id: propertyId,
                                };

                                const variantPropertyInsertResult = await supabase
                                    .from('variant_properties')
                                    .insert([variantPropertyData])
                                    .single();

                                if (variantPropertyInsertResult.error) {
                                    throw variantPropertyInsertResult.error;
                                }
                            }
                        }

                        resolve(results.data);
                    } catch (error) {
                        rejectWithValue(error.message);
                    }
                },
            });
        });
    }
);

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

const ImportProductsSlice = createSlice({
  name: 'import-product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(importCSV.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(importCSV.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(importCSV.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default ImportProductsSlice.reducer;
