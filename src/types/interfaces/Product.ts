import { Store  } from "./Store";
import { Category } from "./Category";


export interface Product {
  id: string;
  storeId?: Store["id"];
  sku?: string;
  ean?: number;
  name: string;
  categoryId: number;
  subCategoryId:Number;
  description?: string;
  images?: string[];
  stock?: number;
  variantIds?: number[];
}

export interface ProductVariant {
  id?: string;
  sku?: string;
  ean?: number;
  name: string;
  variantname: string;
  category?:string;
  productname:string;
  productId:number;
  priceht: string;
  tva:string;
  pricettc:string;
  brand?:string;
  manufacturer?:string;
  weight?:number;
  height?:number;
  width?:number;
  image?: string;
  options?:Option[];
  stock: string;
  [key: string]: any;
  // stockId?: string;
}

export interface Properties {
  id:number;
  name:string;
  value:string;
  // variantProperties:
}

export interface VariantProperties {
  id:number;
  variantId:number;
  propertyId:number;
}

export interface Option {
  id: string;
  name: string;
  value: string | number;
}

export interface Products extends Array<Product> {}