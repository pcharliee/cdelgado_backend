import dotenv from 'dotenv';
dotenv.config();

const mongoConfig = {
//   user:"carlos",
//   pwd:"peluli2210",
//   name:"ecommerce"
  user: process.env.MONGO_USER,
  pwd:  process.env.MONGO_PWD,
  name: process.env.MONGO_NAME
};

export default mongoConfig;
