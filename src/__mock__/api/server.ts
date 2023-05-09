import { createServer, Model, Factory, RestSerializer, hasMany, belongsTo } from 'miragejs';
import { Product,ProductVariant,Option, Products } from '../../types/interfaces/Product';
import {Stock, StockAjustment} from '@/types/interfaces/Stock';
import { faker } from '@faker-js/faker';
import {fakeProduct} from '../data/fake'

export const  setupMockServer =  ():void => {
const apiUrl = 'http://127.0.0.1:1420/api'

  createServer({
  models: {
    product: Model.extend({
      variants: hasMany(),
      stock:belongsTo(),
    }),
    variant: Model.extend({
      product: belongsTo(),
      stock:belongsTo(),
      options: hasMany()
    }),
    option: Model.extend({
      variants: belongsTo()
    }),
    stock: Model.extend({
      stockAjustment: hasMany(),
      product:hasMany(),
      variant:hasMany()
    }),
    stockAjustment: Model.extend({
      stock: belongsTo()
    })

  },
  serializers: {
    product:RestSerializer.extend({
      include: ['variants', "stock"],
      embed: true
    }),
    variant:RestSerializer.extend({
      include: ['options',"stock"],
      embed: true
    }),
    option:RestSerializer.extend({
      include: ['variants'],
      embed: true
    }),
    stock:RestSerializer.extend({
      include: ['stockAjustment'],
      embed: true
    }),
  },
  factories: {
    product: Factory.extend<Product>({
      id() {
        return faker.datatype.uuid();
      },
      storeId() {
        return faker.datatype.uuid();
      },
      sku() {
        return faker.datatype.string(6);
      },
      ean() {
        return faker.datatype.number({ min: 100000000, max: 1000000000 });
      },
      name() {
        return faker.commerce.productName();
      },
      category() {
        return faker.datatype.uuid();
      },
      description() {
        return faker.commerce.productDescription();
      },
      price() {
        return faker.datatype.number({ min: 1, max: 1000 });
      },
      images() {
        return [faker.image.imageUrl()];
      },
      // stock() {
      //   return faker.datatype.number({ min: 1, max: 1000 });
      // },
     
    }),
    variant: Factory.extend<ProductVariant>({
      id() {
        return faker.datatype.uuid();
      },
      sku() {
        return faker.datatype.string(6);
      },
      ean() {
        return faker.datatype.number({ min: 100000000, max: 1000000000 });
      },
      name() {
        return faker.commerce.productName();  
      },
      price() {
        return faker.datatype.number({ min: 1, max: 1000 });
      },
      // stock() {
      //   return faker.datatype.number({ min: 1, max: 1000 });
      // },
      images() {
        return [faker.image.imageUrl()];
      },
      
    }),
    option: Factory.extend<Option>({
      id() {
        return faker.datatype.uuid();
      },
      name() {
        return faker.commerce.productMaterial();
      },
      value() {
        return faker.commerce.productName();
      },
    }),
    stock: Factory.extend<Stock>({
      id() {
        return faker.datatype.uuid();
      },
      productId() {
        return faker.datatype.uuid();
      },
      variantId() {
        return faker.datatype.uuid();
      },
      stock() {
        return faker.datatype.number({ min: 1, max: 1000 });   
      },
      createdAt() {
        return faker.date.past();
      },
      updatedAt() {
        return faker.date.past();
      }
  }),
  stockAjustment: Factory.extend<StockAjustment>({
    id() {
      return faker.datatype.uuid();
    },
    stockId() {
      return faker.datatype.uuid();
    },
    ajustmentStock() {
      return faker.datatype.number({ min: 1, max: 1000 });   
    },
    motifCode() {
      return faker.helpers.arrayElement([1, 2, 3,4,5,6]);   
    },
    createdAt() {
      return faker.date.past();
    },
    updatedAt() {
      return faker.date.past();
    }
    
})

  },
  routes() {
    // this.namespace = '/api';
    this.get(
       `${apiUrl}/products`,
      (schema) => {
        return schema.db.products;
      },
      { timing: 3000 }
    );
    this.get(
      `${apiUrl}/products/:id`,
      (schema, request) => {
        console.log('schema:', schema)
        const id = request.params.id;

        return schema.db.products.find(id);
      },
      { timing: 3000 }
    );
    this.get(
      `${apiUrl}/products/variants/:variantId`,
      (schema, request) => {
        const variantId = request.params.variantId;
        // const product = schema.db.products.find(id);
        return schema.db.variants.find(variantId);
      },
      { timing: 2000 }
    );
    this.get(
      `${apiUrl}/products/stock/:productId`,
      (schema, request) => {
        const productId = request.params.productId;
        const product = schema.db.products.find(productId);
        return schema.db.stock.find(productId);
      },
      { timing: 2000 }
    );
  },
  seeds(server) {
   const products = server.createList('product', 10);
  const stock = server.create("stock")
  const options = server.createList('option', 2);

  

    products.forEach((product) => {
      server.createList('variant',6, { product, stock });
       const variants = server.createList('variant', 6, { product, stock });

       variants.forEach((variant) => {
      const options = server.createList('option', 2);

      options.forEach((option) => {
        variant.update('options', [...variant.options.models, option]);
      });
    });
      
    });

     
    return products;
  }
});
}
