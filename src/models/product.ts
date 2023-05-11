import { ProductVariant, Product, Option } from "../types/interfaces/Product";
export class ProductModel {
    id: string; 
    storeId: string;
    sku: string;
    ean?: number;
    name: string;
    category: string;
    description: string;
    price: number;
    images: string[];
    stock?: number;
    variants?: ProductVariant[];

    constructor(data:Product){
        this.id = data.id;
        this.storeId = data.storeId;
        this.sku = data.sku;
        this.ean = data.ean;
        this.name = data.name;
        this.category = data.category;
        this.description = data.description;
        this.price = data.price;    
        this.images = data.images;
        this.stock = data.stock;
        this.variants = data.variants?.map((variant)=>new variantModel(variant));
    }
    get productId(){
        return this.id;
    };
    get productStoreId(){
        return this.storeId;
    };
    get productSku(){
        return this.sku;
    };
    get productEan(){
        return this.ean;
    };
    get productName(){
        return this.name;
    };
    get productCategory(){
        return this.category;
    };
    get productDescription(){
        return this.description;
    };
    get productPrice(){
        return this.price;
    }
    get productImages(){
        return this.images;
    };
    get productStock(){
        return this.stock;
    };
    get productVariants(){
        return this.variants;
    };
  
};

class variantModel {
    id: string;
    sku: string;
    ean?: number;
    name: string;
    price: number;
    stock: number;
    images: string[];
    options?:Option[];
    constructor(data:ProductVariant){
        this.id = data.id;
        this.sku = data.sku;
        this.ean = data.ean;
        this.name = data.name;
        this.price = data.price;
        this.stock = data.stock;
        this.images = data.images;
        this.options = data.options?.map((option)=>new OptionModel(option));
    }
    get variantId(){
        return this.id;
    };
    get variantSku(){
        return this.sku;
    };
    get variantEan(){
        return this.ean;
    };
    get variantName(){
        return this.name;
    };
    get variantPrice(){
        return this.price;
    };
    get variantStock(){
        return this.stock;
    };
    get variantImages(){
        return this.images;
    };
    get variantOptions(){
        return this.options;
    };

    variantObject(){
        return {
            id:this.id,
            sku:this.sku,
            ean:this.ean,
            name:this.name,
            price:this.price,
            stock:this.stock,
            images:this.images,
            options:this.options
        }
    }

}
class OptionModel {
    id: string;
    name: string;
    value: string | number;
    constructor(data:Option){
        this.id = data.id;
        this.name = data.name;
        this.value = data.value;
    }
    get optionId(){
        return this.id;
    };
    get optionName(){
        return this.name;
    };
    get optionValue(){
        return this.value;
    };
}