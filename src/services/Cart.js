import database from '../config.js';

export default class Carts {
  constructor() {
    database.schema.hasTable('carts')
      .then(function (result) {
        if (!result) {
          database.schema.createTable('carts', table => {
            table.increments();
            table.timestamps(true, true);
            table.json('products').notNullable().defaultTo([]);
          }).then(function (response) {
            console.log('Carts table created', response);
          });
        }
      });
  };

  getCarts = async function () {
    try {
      let carts = await database.select().table('carts');
      return { status: 'success', payload: carts };
    } catch (error) {
      return { status: 'error', message: error.message }
    }
  };

  getCartsById = async function (id) {
    try {
      let product = await database
                            .table('carts')
                            .select()
                            .where('id', id)
                            .first();
      if (product) return { status: 'success', payload: product };
      else return { status: 'error', message: 'No cart found' } 
    } catch (error) {
      return { status: 'error', message: error.message }
    }
  }

  createCart = async function (productId) {
    try {
      let count = await database.table('carts').insert({})
      return { status: 'success', payload: count };
    } catch (error) {
      return { status: 'error', message: error.message }
    }
  }

  deleteCart = async function (id) {
    try {
      let count = await database.table('carts').where('id', id).del();
      if (count > 0)
        return { status: 'success', message: `Cart ${id}, deleted` };
      else
        return { status: 'error', message: 'No cart found' };
    } catch (error) {
      return { status: 'error', message: error.message }
    }
  }

  // addToCart = async function (cartId, productId) {
  //   try {
  //     let product = await database
  //                           .table('products')
  //                           .select()
  //                           .where('id', productId).first();
  //     let count = await database.table('carts').join('products', '')
      
  //     // .products.push(product)
  //     const count = await database
  //                           .table('carts')
  //                           .where({id: cartId})
  //                           .update(cart)
  //     return { status: 'success', payload: 'holi' }
  //   } catch (error) {
  //     return { status: 'error', message: error.message }
  //   }
  // }
}