import database from '../config.js';

export default class Products {
  constructor() {
    database.schema.hasTable('products')
      .then(function (result) {
        if (!result) {
          database.schema.createTable('products', table => {
            table.increments();
            table.string('title').notNullable();
            table.string('author').notNullable();
            table.float('price').notNullable();
            table.string('code').notNullable().defaultTo('F-999');
            table.integer('stock').notNullable();
            table.string('thumbnail').notNullable();
            table.timestamps(true, true);
          }).then(function (response) {
            console.log('Products table created', response);
          });
        }
      });
  };

  getProducts = async function () {
    try {
      let products = await database.select().table('products');
      return { status: 'success', payload: products };
    } catch (error) {
      return { status: 'error', message: error.message }
    }
  };
  
  getProductById = async function (id) {
    try {
      let product = await database
                            .table('products')
                            .select()
                            .where('id', id)
                            .first();
      if (product) return { status: 'success', payload: product };
      else return { status: 'error', message: 'Not found' };
    } catch (error) {
      return { status: 'error', message: error.message };
    }
  }

  saveProduct = async function (product) {
    try {
      let exists = await database
                          .table('products')
                          .select()
                          .where('title', product.title)
                          .first()
      
      if (exists) return { status: 'error', message: 'Already exists!'};
      
      let newProduct = await database.table('products').insert(product);
      return { status: 'success', payload: newProduct };
                            
    } catch (error) {
      return { status: 'error', message: error.message };
    }
  }

  updateById = async function (id, product) {
    try {
      const count = await database.table('products').where({id}).update(product);
      if (count > 0)
        return { status: 'success', message: `ProductID ${id}, updated` };
      else
        return { status: 'error', message: 'No updates. No product found' };
    } catch (error) {
      return { status: error, message: error };
    }
  }

  deleteProduct = async function (id) {
    try {
      let count = await database.table('products').where('id', id).del();
      if (count > 0)
        return { status: 'success', message: `ProductID ${id}, deleted` };
      else
        return { status: 'error', message: 'No product found' };
    } catch (error) {
      return { status: 'error', message: error.message };
    }
  }
};