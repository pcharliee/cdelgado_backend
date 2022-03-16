import express from 'express';
import upload from '../services/upload.js';
import productsController from '../controllers/products.js';
const router = express.Router();

router.get('/', productsController.getProducts);
router.get('/:id', productsController.getProductById);
router.post('/checkout', productsController.checkout);
router.post('/', [ upload.single('thumbnail') ], productsController.addProduct);
router.put('/:id', [ upload.single('thumbnail') ], productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);

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
