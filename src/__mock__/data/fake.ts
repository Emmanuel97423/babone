import { faker } from '@faker-js/faker';
import { Product } from '../../types/interfaces/Product';

function createRandomProduct(): Product {
  const name = faker.commerce.productName();
  const category = faker.datatype.uuid()
  const ean = faker.datatype.number({ min: 100000000, max: 1000000000 });
  const description = faker.commerce.productDescription()

const variants =  [
        {
            id: faker.datatype.uuid(),
            sku: faker.datatype.string(6),
            ean,
            name,
            price: faker.datatype.number({ min: 1, max: 1000 }),
            stock: faker.datatype.number({ min: 1, max: 1000 }),
            images: [faker.image.imageUrl(), faker.image.imageUrl()],
            options: [
                {
                    id: faker.datatype.uuid(),
                    name: faker.commerce.productMaterial(),
                    value: faker.commerce.productMaterial(),
                },
                {
                    id: faker.datatype.uuid(),
                    name: faker.commerce.productMaterial(),
                    value: faker.commerce.productMaterial(),
                },
            ],
        },
    ]

  return {
    id: faker.datatype.uuid(),
    storeId: faker.datatype.uuid(),
    sku: faker.datatype.string(6),
    ean,
    name,
    category,
    description,
    price: faker.datatype.number({ min: 1, max: 1000 }),
    images: [faker.image.imageUrl()],
    stock: faker.datatype.number({ min: 1, max: 1000 }),
    variants

    // subscriptionTier: faker.helpers.arrayElement(['free', 'basic', 'business']),
  };
}

export const fakeProduct = createRandomProduct();
