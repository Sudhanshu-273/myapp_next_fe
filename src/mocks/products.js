import { sample } from 'lodash';
import { faker } from '@faker-js/faker';
import { fetchProductData } from './products.server.js';

const PRODUCT_COLOR = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];

export async function generateProducts(count = 24) {
  const fetched = await fetchProductData(count);
  console.log(fetched);
  return fetched.map((item, index) => {
    const setIndex = index + 1;

    return {
      id: faker.string.uuid(),
      cover: item.image,
      name: item.name,
      price: faker.number.float({ min: 20, max: 200, precision: 0.01 }),
      priceSale: setIndex % 3 === 0 ? faker.number.float({ min: 10, max: 50, precision: 0.01 }) : null,
      colors:
        (setIndex === 1 && PRODUCT_COLOR.slice(0, 2)) ||
        (setIndex === 2 && PRODUCT_COLOR.slice(1, 3)) ||
        (setIndex === 3 && PRODUCT_COLOR.slice(2, 4)) ||
        (setIndex === 4 && PRODUCT_COLOR.slice(3, 6)) ||
        (setIndex === 23 && PRODUCT_COLOR.slice(4, 6)) ||
        (setIndex === 24 && PRODUCT_COLOR.slice(5, 6)) ||
        PRODUCT_COLOR,
      status: sample(['sale', 'new', '', '']),
    };
  });
}
