import knex from 'knex';
import __dirname from './utils.js';
import mongoConfig from './database/mongoose/config.js';
import firebaseConfig from './database/firebase/config.js';

export default {
  fileSystem: {
    baseUrl: `${__dirname}/files/`
  },
  mongo: {
    baseUrl: `mongodb+srv://${mongoConfig.user}:${mongoConfig.pwd}@ecommerce.uznsc.mongodb.net/${mongoConfig.name}?retryWrites=true&w=majority`,
    options: { useNewUrlParser: true, useUnifiedTopology: true }
  },
  firebase: {
    baseUrl: `https://${firebaseConfig.project_id}.firebaseio.com`
  }
}

// export const sqlite3Db = knex({
//   client: 'sqlite3',
//   connection: { filename: __dirname+'/database/messages.sqlite' },
//   useNullAsDefault: true,
// });

// const database = knex({
//   client: 'mysql',
//   version: '10.4.22',
//   connection: {
//     host: '127.0.0.1',
//     port: 3306,
//     user: 'root',
//     password: 'Carlos2210!',
//     database: 'ecommerce_products'
//   },
//   pool: { min: 0, max: 10 }
// });

// export default database;