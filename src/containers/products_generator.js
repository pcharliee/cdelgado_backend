import faker from 'faker';

export default function generateProducts() {
  const limit = 5;
  const products = [];
  for (let i = 0; i < limit; i++) {
    let obj = {
      id: faker.datatype.uuid(),
      created_at: new Date().toISOString(),
      author: faker.fake("{{name.firstName}} {{name.lastName}}"),
      title: faker.fake("{{name.firstName}} and the {{commerce.productAdjective}} {{commerce.productMaterial}}"),
      price: faker.commerce.price(500, 5000, 0),
      thumbnail: faker.image.image(200,300)
    }
    products.push(obj);
  }
  return Promise.resolve({ status: 'success', payload: products });
};