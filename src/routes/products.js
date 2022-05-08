import express from 'express';
import upload from '../services/upload.js';
import productsController from '../controllers/products.js';
import { passportCall, isAdmin } from '../utils/middlewares.js';
const router = express.Router();

router.get('/', productsController.getProducts);
router.get('/:id', productsController.getProductById);
router.post('/checkout', productsController.checkout);
router.post('/', [
    upload.single('thumbnail'),
    passportCall('jwt'),
    isAdmin
  ], productsController.addProduct);
router.put('/:id', [
    upload.single('thumbnail'),
    passportCall('jwt'),
    isAdmin
  ], productsController.updateProduct);
router.delete('/:id', [
    passportCall('jwt'),
    isAdmin
  ], productsController.deleteProduct);

router.get('/*', function (req, res) {
  let errorObj = {
    error: -2,
    route: req.url,
    method: req.method,
    message: 'Not implemented'
  }
  res.status(404).send(errorObj)
});

export default router;
