import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  getVariant,
  createVariant,
  getProductByName,
  createProduct,
  getCategory
} from '@/services/database/products';
import { modelingCsv } from '@/utils/modelingCsv';
import type { ProductVariant, Product } from '@/types/interfaces/Product';
export const importCSV = createAsyncThunk(
  'products/importCSV',

  async (file: File, { rejectWithValue }) => {
    try {
      // Modeling csv to data
      const result = await modelingCsv(file, { rejectWithValue });
      // @ts-ignore 
      result.map(async (variant: ProductVariant) => {
        console.log('variant:', variant);
        const categoryName = variant.category;
        const productName = variant.productname;
        const variantPriceHt = parseFloat(variant.priceht);
        const variantTva = parseFloat(variant.tva);
        const variantPriceTtc = parseFloat(variant.pricettc);
        const variantStock = parseFloat(variant.stock)

        //Get category if no exist create category
        if (categoryName) {
          try {
            const category = await getCategory(categoryName);
            if (category) {
              // @ts-ignore 
              const categoryId = category.id;

              //Check if product base exist if no exist create product base
              const getProduct = await getProductByName(
                productName,
                categoryId
              );
              if (getProduct) {
                console.log('getProduct:', getProduct);
                //Add variant with product base Id

                const variantObject = {
                  // variantname: variant.variantname,
                  name: variant.variantname,
                  // productname: getProduct.name,
                  // @ts-ignore 
                  productId: getProduct.id,
                  priceHt: variantPriceHt,
                  tva: variantTva,
                  priceTtc: variantPriceTtc,
                  stock: variantStock,
                  brand: variant.brand,
                  manufacturer: variant.manufacturer,
                  weight: variant.weight,
                  height: variant.height,
                  width: variant.width,
                  image: variant.image
                };
                // @ts-ignore 
                const variantCreate = await getVariant(variantObject);
                console.log('variantCreate:', variantCreate);
              }
            }
          } catch (error) {
            console.log('error:', error);
          }
        }


        // const variantExist = await getVariant(variant.name);
        // if (variantExist) {
        //   console.log('variantExist:', variantExist);
        // } else {
        //   try {
        //     const variantObject = {
        //       name: variant.name,
        //       productId: variant.productId,
        //       priceHt: variant.priceHt,
        //       tva: variant.tva,
        //       priceTtc: variant.priceTtc,
        //       stock: variant.stock,
        //       brand: variant.brand,
        //       manufacturer: variant.manufacturer,
        //       weight: variant.weight,
        //       height: variant.height,
        //       width: variant.width,
        //       image: variant.name
        //     };
        //     const newVariant = await createVariant(variant);
        //   } catch (error) {
        //     console.log('error:', error);
        //   }
        // }
      });
    } catch (error) {
      console.log('error:', error);
    }

    // return new Promise((resolve, reject) => {
    //   Papa.parse<CSVRowProps>(file, {
    //     header: true,
    //     complete: async (results) => {
    //       console.log('results:', results);
    //       if (results.errors.length > 0) {
    //         return rejectWithValue(results.errors);
    //       }

    //       return;

    //       try {
    //         const insertedProducts: Record<string, number> = {};

    //         for (const row of results.data) {
    //           const variantName = row.VariantName;
    //           const productName = row.ProductName;

    //           let productId = insertedProducts[productName];

    //           if (!productId) {
    //             //Check existing product
    //             const existingProduct = await supabase
    //               .from('product')
    //               .select()
    //               .eq('name', productName);
    //             console.log('existingProduct:', existingProduct);

    //             if (existingProduct.status == 404) {
    //               // Insert product into products table
    //               const productInsertResult = await supabase
    //                 .from('products')
    //                 .insert([{ name: productName }])
    //                 .select()
    //                 .single();
    //               console.log('productInsertResult:', productInsertResult);

    //               productId = productInsertResult.data?.product_id;

    //               insertedProducts[productName] = productId;
    //             }
    //           }

    //           // Insert variant into variants table with the product_id
    //           const variantInsertResult = await supabase
    //             .from('variants')
    //             .insert([{ name: variantName, product_id: productId }])
    //             .select()
    //             .single();
    //           console.log('variantInsertResult:', variantInsertResult);

    //           let variantId = insertedProducts[variantName];

    //           if (!variantId) {
    //             // Check if variant with the same name already exists
    //             const existingVariantResult = await supabase
    //               .from('variants')
    //               .select('variant_id')
    //               .eq('name', variantName)
    //               .select()
    //               .single();

    //             variantId = existingVariantResult.data?.variant_id;

    //             if (!variantId) {
    //               // Insert variant into variants table
    //               const variantInsertResult = await supabase
    //                 .from('variants')
    //                 .insert([{ name: variantName }])
    //                 .select()
    //                 .single();

    //               variantId = variantInsertResult.data?.variant_id;
    //             }

    //             insertedProducts[variantName] = variantId;
    //           }

    //           // Insert variant properties into properties table and variant_properties table
    //           const variantProperties = [
    //             { name: 'Category', value: row.Category },
    //             { name: 'SousCategory', value: row.SousCategory },
    //             { name: 'PriceHt', value: row.PriceHt },
    //             { name: 'Tva', value: row.Tva },
    //             { name: 'PriceTtc', value: row.PriceTtc },
    //             { name: 'Stock', value: row.Stock },
    //             { name: 'Brand', value: row.Brand },
    //             { name: 'Manufacturer', value: row.Manufacturer },
    //             { name: 'Size', value: row.Size },
    //             { name: 'Color', value: row.Color },
    //             { name: 'Weight', value: row.Weight },
    //             { name: 'Laterality', value: row.Laterality },
    //             { name: 'Material', value: row.Material },
    //             { name: 'Height', value: row.Height },
    //             { name: 'Width', value: row.Width },
    //             { name: 'Image', value: row.Image }
    //           ];

    //           for (const property of variantProperties) {
    //             // Check if property exists
    //             const existingPropertyResult = await supabase
    //               .from('properties')
    //               .select('property_id')
    //               .eq('name', property.name)
    //               .eq('value', property.value)
    //               .select()
    //               .single();
    //             console.log('existingPropertyResult:', existingPropertyResult);

    //             let propertyId = existingPropertyResult.data?.property_id;

    //             // Insert property if it doesn't exist
    //             if (!propertyId) {
    //               const propertyInsertResult = await supabase
    //                 .from('properties')
    //                 .insert([{ name: property.name, value: property.value }])
    //                 .select()
    //                 .single();
    //               console.log('propertyInsertResult:', propertyInsertResult);

    //               propertyId = propertyInsertResult.data?.property_id;
    //             }

    //             // Insert into variant_properties table
    //             const variantPropertyData = {
    //               variant_id: variantId,
    //               property_id: propertyId
    //             };

    //             const variantPropertyInsertResult = await supabase
    //               .from('variant_properties')
    //               .insert([variantPropertyData])
    //               .select()
    //               .single();
    //             console.log(
    //               'variantPropertyInsertResult:',
    //               variantPropertyInsertResult
    //             );
    //           }
    //         }

    //         resolve(results.data);
    //         console.log('results:', results);
    //       } catch (error) {
    //         rejectWithValue(error.message);
    //       }
    //     }
    //   });
    // });
  }
);
interface InitialState {
  entities: []
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error:string
}

const initialState = {
    entities: [],
    loading:'idle',
    error:''
} as InitialState

const ImportProductsSlice = createSlice({
  name: 'importProduct',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(importCSV.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(importCSV.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        // @ts-ignore 
        state.entities = action.payload;
      })
      .addCase(importCSV.rejected, (state, action) => {
        state.loading = 'failed';
        // @ts-ignore 
        state.error = action.error.message ;
      });
  }
});

export default ImportProductsSlice.reducer;
