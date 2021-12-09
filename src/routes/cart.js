import express from 'express';
import CartsContainer from '../classes/Carts_container.js';
const cartsRouter = express.Router();
const Carts = new CartsContainer();

cartsRouter.post('/', function (req, res) {
  Carts.createCart().then(function (result) {
    if (result.status == 'error') res.status(400).send(result.message);
    else res.status(200).send(result.message);
  })
})

cartsRouter.post('/:id/products', function (req, res) {
  let cartId = parseInt(req.params.id);
  let newItemId = req.body.id;
  Carts.saveToCart(cartId, newItemId).then(function (result) {
    console.log('result aca', result)
    if (result.status == 'error') res.status(400).send(result.message);
    else res.status(200).send(result.pay);
  });
});

cartsRouter.get('/:id/products', function (req, res) {
  let cartId = parseInt(req.params.id);
  Carts.getAll(cartId).then(function (result) {
    if (result.status == 'error') res.status(400).send(result.message);
    else res.status(200).send(result.payload);
  })
})

cartsRouter.delete('/:id', function (req, res) {
  let cartId = parseInt(req.params.id);
  Carts.deleteCart(cartId).then(function (result) {
    if (result.status == 'error') res.status(400).send(result.message);
    else res.status(200).send(result.message);
  })
});

cartsRouter.delete('/:id/products/:id_prod', function (req, res) {
  let cartId = parseInt(req.params.id);
  let productId = parseInt(req.params.id_prod);

  Carts.deleteCartItem(cartId, productId).then(function (result) {
    if (result.status == 'error') res.status(400).send(result.message);
    else res.status(200).send(result.message);
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
})

export default cartsRouter;