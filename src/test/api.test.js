import supertest from 'supertest';
import faker from 'faker';
import chai, { expect } from 'chai';

const request = supertest(`http://localhost:9091`);

describe('products API', function () {
  let productId;

  beforeEach(async function () {
    let products = await request.get('/api/products');
    let randomProduct = Math.floor(Math.random() * products.body.length);
    productId = products.body[randomProduct].id;
  });

  it('returns list of products', async function () {
    let response = await request.get('/api/products');
    expect(response.status).to.equal(200);
    expect(response.body).to.not.equal([]);
  });

  it('saves product', async function () {
    let newProduct = {
      title: faker.commerce.productName(),
      author: faker.name.findName(), 
      thumbnail: faker.image.image(200, 400),
      price: faker.commerce.price(1000, 5000, 0),
    };
    let response = await request.post('/api/products').send(newProduct)
    expect(response.status).to.equal(200);
    expect(response.body).to.eql({
      status: 'success',
      message: 'Successfully added',
      payload: response.body.payload
    });
  });
  
  it('deletes a product', async function () {
    let response = await request.delete(`/api/products/${productId}`)
    expect(response.status).to.equal(200);
    expect(response.body).to.eql({
      status: 'success',
      message: 'Successfully deleted',
      payload: { deletedCount: 1 } 
    });
  });
});
