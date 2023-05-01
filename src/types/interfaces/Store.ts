import { Product, Products } from "./Product";

export interface Store {
  id: string;
  name: string;
  description: string;
  image: string;
  adress: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;

}

export interface RootState {
  stores: Store[];
  store: Store;
  loading: boolean;
  error: string;
  products: Products;
  product:Product
}