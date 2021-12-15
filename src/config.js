import knex from 'knex';
import __dirname from './utils.js';

export const sqlite3Db = knex({
  client: 'sqlite3',
  connection: { filename: __dirname+'/database/messages.sqlite' },
  useNullAsDefault: true,
});

const database = knex({
  client: 'mysql',
  version: '10.4.22',
  connection: {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'Carlos2210!',
    database: 'ecommerce_products'
  },
  pool: { min: 0, max: 10 }
});

export default database;