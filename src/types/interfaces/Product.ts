import { Store  } from "./Store";
import { Category } from "./Category";


export interface Product {
  id: string;
  storeId: Store["id"];
  sku: string;
  ean?: number;
  name: string;
  category: Category["id"];
  description: string;
  price: number;
  images: string[];
  stock?: number;
  variants?: ProductVariant[];
  variantIds?: string[];
}

export interface ProductVariant {
  id: string;
  sku: string;
  ean?: number;
  name: string;
  price: number;
  images: string[];
  options?:Option[];
  stock?: number;
  stockId?: string;
}

export interface Option {
  id: string;
  name: string;
  value: string | number;
}

export interface Products extends Array<Product> {}