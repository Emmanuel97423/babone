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
}

export interface ProductVariant {
  id: string;
  sku: string;
  ean?: number;
  name: string;
  price: number;
  stock: number;
  images: string[];
  options:Option[];
}

export interface Option {
  id: string;
  name: string;
  value: string;
}

export interface Products extends Array<Product> {}