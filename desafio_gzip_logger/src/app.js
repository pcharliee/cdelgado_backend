import express from 'express';
import compression from 'compression';
import { createLogger } from './logger.js';

const app = express();
const PORT = parseInt(process.argv[2]) || 8080;
const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
const logger = createLogger();

/* gzip */
// app.use(compression());

const products = [
  { id: 1, name: 'Ice cream', price: 2000 },
  { id: 2, name: 'Steak',     price: 5000 },
  { id: 3, name: 'Book',      price: 7000 },
];
/* logger */
app.use(function (req, res, next) {
  logger.info(`${req.method} method received at path ${req.path}`);
  next();
});

app.get('/', function (req, res) {
  res.status(200).send({ message: "Carlos Delgado - Coderhouse" })
});

app.get('/product/:id', function (req, res) {
  let id = parseInt(req.params.id);
  let product = products.find(function (prod) {
    return prod.id == id;
  })
  if (!product) {
    logger.error(`Tried to get an unexisting product: Product ID: ${id}`);
    return res.send({ message: `No product for ID: ${id}` });
  }
  
  logger.info(`Product with ID: ${id} was requested`);
  res.status(200).send({ product: product });
});

let sentence = "This is a compression test";
app.get('/compression', function (req, res) {
  let response = "";
  for (let i=0; i < 1000; i++) {
    response += sentence;
  };
  res.send({ message: response });
});

app.get('/*', function (req, res) {
  logger.warn(`Tried to access invalid URL ${req.path}`);
  res.status(404).send({ message: 'Invalid route' });
})
