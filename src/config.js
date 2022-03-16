import dotenv from 'dotenv'
import __dirname from './utils.js';
import mongoConfig from './database/mongoose/config.js';
dotenv.config();

export default {
  fileSystem: {
    baseUrl: `${__dirname}/files/`
  },
  mongo: {
    USER: process.env.MONGO_USER,
    PWD: process.env.MONGO_PWD,
    NAME: process.env.MONGO_NAME,
    SECRET: process.env.MONGO_SECRET,
    baseUrl: `mongodb+srv://${mongoConfig.user}:${mongoConfig.pwd}@ecommerce.uznsc.mongodb.net/${mongoConfig.name}?retryWrites=true&w=majority`,
    sessionsUrl: `mongodb+srv://${mongoConfig.user}:${mongoConfig.pwd}@ecommerce.uznsc.mongodb.net/sessions?retryWrites=true&w=majority`,
    options: { useNewUrlParser: true, useUnifiedTopology: true }
  },
  nodemailer: {
    USER: process.env.NODEMAILER_USER,
    PWD: process.env.NODEMAILER_PWD,
  },
  twilio: {
    CLIENT_SID: process.env.TWILIO_CLIENT_SID,
    AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    WHATSAPP_FROM: process.env.WHATSAPP_FROM,
    WHATSAPP_TO: process.env.WHATSAPP_TO,
  },
  jwt: {
    SECRET: process.env.JWT_SECRET
  },
  aws: {
    ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    S3_BUCKET: process.env.S3_BUCKET
  },
  facebook: {
    CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
    CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
    CALLBACK_URL: process.env.FACEBOOK_CALLBACK_URL,
  }
}
