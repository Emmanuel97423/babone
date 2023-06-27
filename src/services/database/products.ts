import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database/databaseType';
import type { ProductVariant,Product, Products } from '@/types/interfaces/Product';
// import { Product } from '@prisma/client';
import { Result } from 'postcss';

const supabaseUrl: string =
  import.meta.env.VITE_SUPA_URL || import.meta.env.TAURI_SUPA_URL;
const supabasePrivateKey: string = import.meta.env.VITE_SUPA_API_PRIVATE_KEY;
const supabaseAnonPublicKey: string = import.meta.env.VITE_SUPA_API_PUBLIC_KEY;

export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonPublicKey
);

const PRODUCT_TABLE = 'Product';
const CATEGORY_TABLE = 'Category';
const VARIANT_TABLE = 'Variant';


export const fetchProductsFromDatabase  = async (): Promise<Products> => {
  try {
    const result = await supabase.from(PRODUCT_TABLE).select('*');
    console.log('result:', result)
    if(result.data ){
      return result.data.map(item => ({
        id: item.id,
        storeId: item.storeId || null,
        sku: item.sku || null ,
        ean: item.ean || null,
        name: item.name,
        categoryId: item.categoryId,
        subCategoryId: item.subCategoryId,
        description: item.description || null,
        images: item.images || [],
        stock: item.stock || 0,
        variantIds: item.variantIds || [],
      }));
    }
    return []
    
  } catch (error) {
    console.log('error:', error)
    throw error
  }
}

export const fetchVariantsFromDatabase = async () => {
  try {
    const result = await supabase.from(VARIANT_TABLE).select('*');
    console.log('result:', result)
    if(result.data ){
      return result.data
    }
    
  } catch (error) {
    console.log('error:', error)
    return error
  }
}

export const getProductByName = async (name: string, categoryId: number) => {
  try {
    const result = await supabase
      .from(PRODUCT_TABLE)
      .select('*')
      .eq('name', name)
      .select();
    if (result.data && result.data.length > 0) {
      console.log('Existent product');
      return result.data[0];
    } else {
      try {
        const createProducName = await supabase
          .from(PRODUCT_TABLE)
          .insert([{ name: name, categoryId: categoryId }])
          .select();
        if (createProducName.data) {
          return createProducName.data[0];
        }
        return null;
      } catch (error) {
        console.log('error:', error);
      }
    }
  } catch (error) {
    console.log('error:', error);
    return error;
  }
};
export const getCategory = async (name: string) => {
  try {
    const result = await supabase
      .from(CATEGORY_TABLE)
      .select(`*`)
      .eq('name', name);

    if (result.data && result.data.length > 0) {
      return result.data[0];
    } else {
      console.log('No variant found');
      try {
        const createRow = await supabase
          .from(CATEGORY_TABLE)
          .insert([{ name: name }])
          .select();
        console.log('createRow:', createRow);
        return createRow;
      } catch (error) {
        console.log('error:', error);
        return error;
      }
    }
  } catch (error) {
    console.log('error:', error);
    return error;
  }
};
export const getVariant = async (variantProps: ProductVariant) => {
  console.log('variantProps:', variantProps);
  try {
    const result = await supabase
      .from(VARIANT_TABLE)
      .select()
      .eq('name', variantProps.name);
    if (result.data && result.data.length > 0) {
      const variant = result.data[0];
      console.log('Variant existent');
      for (const key in variant) {
        if (variantProps[key]) {
          if (variant[key] !== variantProps[key]) {
            const updateData: Partial<ProductVariant> = {
              [key]: variantProps[key] // Utilisation de la notation de propriété dynamique
            };

            try {
              const updateVariant = await supabase
                .from(VARIANT_TABLE)
                .update(updateData)
                .eq('id', variant.id)
                .select();
              console.log('updateVariant:', updateVariant);
            } catch (error) {
              console.log('error:', error);
              return error;
            }
            console.log(
              `Updating ${key} from ${variant[key]} to ${variantProps[key]}`
            );
            // variant[key] = variantProps[key];
          }
        }
      }
      return variant;
    }
    if (result.data && result.data.length == 0) {
      console.log('No variant found');
      try {
        const createVariant = await supabase
          .from(VARIANT_TABLE)
          .insert([variantProps])
          .select();
        return createVariant;
      } catch (error) {
        console.log('error:', error);
        return error;
      }
    }
  } catch (error) {
    console.log('error:', error);
    return error;
  }
};

//Old logic

export const createProduct = async (data: any) => {
  try {
    const result = await supabase
      .from('Product')
      .insert([{ name: data.name }])
      .select();
    console.log('result:', result);
  } catch (error) {
    console.log('error:', error);
    return error;
  }
};

export const createVariant = async (data: ProductVariant) => {
  try {
    const result = await supabase.from('Variant').insert(data).select();
    console.log('result:', result);
  } catch (error) {
    console.log('error:', error);
    return error;
  }
};

export const createCategory = async (name: string) => {
  try {
    const result = await supabase.from('Category').insert(name).select();
    console.log('result:', result);
  } catch (error) {
    console.log('error:', error);
    return error;
  }
};

type VariantResponse = Awaited<ReturnType<typeof getVariant>>;
export type VariantResponseSuccess = VariantResponse['data'];
export type VariantResponseError = VariantResponse['error'];
