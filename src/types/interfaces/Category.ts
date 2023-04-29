import { Products } from './Product';
export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  products: Products[];
  shopId: number;

}
