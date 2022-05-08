import express from 'express';
import cartController from '../controllers/cart.js';
import { passportCall, isAdmin } from '../utils/middlewares.js';
const cartsRouter = express.Router();

cartsRouter.get('/', [
    passportCall('jwt'),
    isAdmin
  ], cartController.getCarts);
cartsRouter.get('/:id/products', cartController.getCartById);

cartsRouter.post('/', [
  passportCall('jwt'),
  isAdmin
  ], cartController.createCart);
cartsRouter.post('/:id/products', cartController.addToCart);

cartsRouter.delete('/:id', cartController.deleteCart);
cartsRouter.delete('/:id/products/:id_prod', cartController.deleteCartItem);

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
