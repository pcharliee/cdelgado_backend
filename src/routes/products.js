import express from 'express';
import Container from '../classes/Products_container.js';
import upload from '../services/upload.js';
import { io } from '../app.js';
import { authMiddleware } from '../utils.js';
const router = express.Router();
const Products = new Container();

router.get('/', function (req, res) {
  Products.getAll().then(function (result) {
    if (result.status == 'error') res.status(400).send('File is empty');
    else res.status(200).send(result.payload);
  });
});

router.get('/:id', async function (req, res) {
  let productId = parseInt(req.params.id);
  Products.getById(productId).then(function (result) {
    if (result.status == 'error') res.status(400).send(result.message);
    else res.status(200).send(result.payload);
  });
});

router.post('/', [ upload.single('thumbnail'), authMiddleware ], (req, res) => {
  let file = req.file;
  let newObject = req.body;
  newObject.created_at = new Date().toISOString();
  newObject.thumbnail 
    = `${req.protocol}://${req.headers.host}/images/${file.filename}` || req.body.thumbnail
  Products.saveProduct(newObject).then(result => {
    if (result.status == 'success') {
      Products.getAll()
        .then(function (products) {
          io.emit('showBookCatalog', products)
        });
    };
    res.send(result);
  });
});

router.put('/:id', authMiddleware, (req, res) => {
  let productId = parseInt(req.params.id);
  let updatedObject = req.body
  updatedObject.updated_at = new Date().toISOString();
  Products.updateById(productId, updatedObject).then(function (result) {
    if (result.status == 'error') res.status(400).send(result.message);
    else res.status(200).send(result);
  });
});

router.delete('/:id', authMiddleware, async function (req, res) {
  let productId = parseInt(req.params.id);
  Products.deleteById(productId).then(function (result) {
    if (result.status == 'error') res.status(400).send(result.message);
    else res.status(200).send(result);
  });
});

router.get('/*', function (req, res) {
  let errorObj = {
    error: -2,
    route: req.url,
    method: req.method,
    message: 'Not implemented'
  }
  res.status(404).send(errorObj)
})

export default router;