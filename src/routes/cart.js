import express from 'express';
import { carts } from '../daos/index.js'
const cartsRouter = express.Router();

cartsRouter.post('/', function (req, res) {
  carts.saveOne().then(function (result) {
    if (result.status == 'error') res.status(400).send(result.message);
    else res.status(200).send(result);
  })
})

cartsRouter.post('/:id/products', function (req, res) {
  let cartId = req.params.id;
  let newItemId = req.body.id;
  carts.saveToCart(cartId, newItemId).then(function (result) {
    if (result.status == 'error') res.status(400).send(result.message);
    else res.status(200).send(result);
  });
});

cartsRouter.get('/', function (req, res) {
  carts.getAll().then(function (result) {
    if (result.status == 'error') res.status(400).send(result.message);
    else res.status(200).send(result.payload);
  })
})

cartsRouter.get('/:id/products', function (req, res) {
  let cartId = req.params.id;
  carts.getById(cartId).then(function (result) {
    if (result.status == 'error') res.status(400).send(result.message);
    else res.status(200).send(result.payload);
  })
})

cartsRouter.delete('/:id', function (req, res) {
  let cartId = req.params.id;
  carts.deleteById(cartId).then(function (result) {
    if (result.status == 'error') res.status(400).send(result.message);
    else res.status(200).send(result.message);
  })
});

cartsRouter.delete('/:id/products/:id_prod', function (req, res) {
  let cartId = req.params.id;
  let productId = req.params.id_prod;

  carts.deleteCartItem(cartId, productId).then(function (result) {
    if (result.status == 'error') res.status(400).send(result.message);
    else res.status(200).send(result);
  });
});

cartsRouter.get('/*', function (req, res) {
  let errorObj = {
    error: -2,
    route: req.url,
    method: req.method,
    message: 'Not implemented'
  }
  res.status(404).send(errorObj)
});

export default cartsRouter;