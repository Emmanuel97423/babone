import { createServer, Model, Factory } from 'miragejs';
import { Product, Products } from '../../types/interfaces/Product'
import { faker } from '@faker-js/faker';
import {fakeProduct} from '../data/fake'


// const productsMock: Products = Factory.extend<Product>(fakeProduct);



export const  setupMockServer =  ():void => {
  createServer({
  models: {
    product: Model
  },
  factories: {
    product: Factory.extend({
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
      variants() {
        return [
          {
            id: faker.datatype.uuid(),
            sku: faker.datatype.string(6),
            ean: faker.datatype.number({
              min: 100000000,
              max: 1000000000
            }),
            name: faker.commerce.productName(),
            price: faker.datatype.number({ min: 1, max: 1000 }),
            stock: faker.datatype.number({ min: 1, max: 1000 }),
            images: [faker.image.imageUrl(), faker.image.imageUrl()],
            options: [
              {
                id: faker.datatype.uuid(),
                name: 'Couleur',
                value: faker.color.human()
              },
              {
                id: faker.datatype.uuid(),
                name: 'Taille',
                value: faker.datatype.float({
                  min: 35,
                  max: 42,
                  precision: 1
                })
              }
            ]
          }
        ];
      }
    })
  },
  routes() {
    this.namespace = 'api';
    this.get(
      '/products',
      (schema, request) => {
        return schema.products.all();
      },
      { timing: 4000 }
    );
  },
  seeds(server) {
    server.createList('product', 10);
  }
});
}
