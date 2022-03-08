import __dirname from './utils.js';
import mongoConfig from './database/mongoose/config.js';

export default {
  fileSystem: {
    baseUrl: `${__dirname}/files/`
  },
  mongo: {
    baseUrl: `mongodb+srv://${mongoConfig.user}:${mongoConfig.pwd}@ecommerce.uznsc.mongodb.net/${mongoConfig.name}?retryWrites=true&w=majority`,
    sessionsUrl: `mongodb+srv://${mongoConfig.user}:${mongoConfig.pwd}@ecommerce.uznsc.mongodb.net/sessions?retryWrites=true&w=majority`,
    options: { useNewUrlParser: true, useUnifiedTopology: true }
  },
}
