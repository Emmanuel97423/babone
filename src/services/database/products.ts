 import {createClient} from '@supabase/supabase-js';
import type { Database} from "@/types/database/databaseType";
import type { ProductVariant } from "@/types/interfaces/Product";
import { Product } from '@prisma/client';




const supabaseUrl:string = import.meta.env.VITE_SUPA_URL || import.meta.env.TAURI_SUPA_URL;
console.log('supabaseUrl:', supabaseUrl)
const supabasePrivateKey:string = import.meta.env.VITE_SUPA_API_PRIVATE_KEY;
console.log('supabasePrivateKey:', supabasePrivateKey)
const supabaseAnonPublicKey:string= import.meta.env.VITE_SUPA_API_PUBLIC_KEY
console.log('supabaseAnonPublicKey:', supabaseAnonPublicKey)

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonPublicKey);

export const getProductByName=async (name:string)=>{
   
    
    try {
        const result = await supabase.from('Product').select('*').eq('name', name).select();
        
       return result.data
    } catch (error) {
        console.log('error:', error);
        return error;
        
    }
 }

  export const createProduct=async (data:any)=>{
    console.log('data:', data)
    
    try {
        const result = await supabase.from('Product').insert([{'name': data.name}]).select();
        console.log('result:', result)
        
       
    } catch (error) {
        console.log('error:', error);
        return error;
        
    }
 }

 export const getVariant=async (name:string)=>{
    try {
        const result = await supabase.from('Variant').select(`*`).eq('name', name);
        
        if(result.data && result.data.length > 0) {
            const variant = result.data[0];
            return variant;

        } else {
            console.log('No variant found');
            return null;
        }
    } catch (error) {
        console.log('error:', error);
        return error;
        
    }
 }
 export const createVariant=async (data:ProductVariant)=>{
    
    try {
        const result = await supabase.from('Variant').insert(data).select();
        console.log('result:', result)
        
       
    } catch (error) {
        console.log('error:', error);
        return error;
        
    }
 }
 

  type VariantResponse = Awaited<ReturnType<typeof getVariant>>
 export type VariantResponseSuccess = VariantResponse['data']
 export type VariantResponseError = VariantResponse['error']