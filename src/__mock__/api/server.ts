import { createServer, Model, Factory, RestSerializer, hasMany, belongsTo } from 'miragejs';
import { Product,ProductVariant,Option, Products } from '../../types/interfaces/Product'
import { faker } from '@faker-js/faker';
import {fakeProduct} from '../data/fake'


export const  setupMockServer =  ():void => {
  createServer({
  models: {
    product: Model.extend({
      variants: hasMany()
    }),
    variant: Model.extend({
      product: belongsTo(),
      options: hasMany()
    }),
    option: Model.extend({
      variant: belongsTo()
    })
  },
  serializers: {
    product:RestSerializer.extend({
      include: ['variants'],
      embed: true
    }),
    variant:RestSerializer.extend({
      include: ['options'],
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
      stock() {
        return faker.datatype.number({ min: 1, max: 1000 });
      },
     
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
      stock() {
        return faker.datatype.number({ min: 1, max: 1000 });
      },
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

  },
  routes() {
    this.namespace = 'api';
    this.get(
      '/products',
      (schema) => {
        return schema.db.products;
      },
      { timing: 4000 }
    );
    this.get(
      '/products/:id',
      (schema, request) => {
        console.log('schema:', schema)
        const id = request.params.id;

        return schema.db.products.find(id);
      }
    );
    this.get(
      '/products/variants/:variantId',
      (schema, request) => {
        const variantId = request.params.variantId;
        // const product = schema.db.products.find(id);
        return schema.db.variants.find(variantId);
      }
    );
  },
  seeds(server) {
   const products = server.createList('product', 10);

    products.map((product) => {
      server.createList('variant',6, { product });
    }
    );

    return products;
  }
});
}
