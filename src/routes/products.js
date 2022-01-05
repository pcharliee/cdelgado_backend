import express from 'express';
import upload from '../services/upload.js';
import { io } from '../app.js';
import { authMiddleware } from '../utils.js';
import { products } from '../daos/index.js'
const router = express.Router();

router.get('/', function (req, res) {
  products.getAll().then(function (result) {
    if (result.status == 'error') res.status(400).send(result.message);
    else res.status(200).send(result.payload);
  });
});

router.get('/:id', async function (req, res) {
  let productId = req.params.id;
  products.getById(productId).then(function (result) {
    if (result.status == 'error') res.status(400).send(result.message);
    else res.status(200).send(result.payload);
  });
});

router.post('/', [ upload.single('thumbnail'), authMiddleware ], (req, res) => {
  let file = req.file;
  let newObject = req.body;
  newObject.thumbnail 
    = `${req.protocol}://${req.headers.host}/images/${file.filename}` || req.body.thumbnail
  products.saveOne(newObject)
    .then(result => {
      if (result.status == 'success') {
        products.getAll()
          .then(function (products) {
            io.emit('showBookCatalog', products)
          });
      };
    res.send(result);
    })
});

router.put('/:id', [ upload.single('thumbnail'), authMiddleware ], (req, res) => {
  let productId = req.params.id;
  let updatedObject = req.body
  products.updateById(productId, updatedObject).then(function (result) {
    if (result.status == 'error') res.status(400).send(result.message);
    else res.status(200).send(result);
  });
});

router.delete('/:id', authMiddleware, async function (req, res) {
  let productId = req.params.id;
  products.deleteById(productId).then(function (result) {
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
});

export default router;