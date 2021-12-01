import express from 'express';
import Container from '../classes/Container.js';
import upload from '../services/upload.js';
import { io } from '../app.js';
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
    else res.status(200).send(result);
  });
});

router.post('/', upload.single('thumbnail'), (req, res) => {
  let file = req.file;
  let newObject = req.body;
  newObject.thumbnail = `${req.protocol}://${req.headers.host}/images/${file.filename}`;
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

router.put('/:id', (req, res) => {
  let productId = parseInt(req.params.id);
  let updatedObject = req.body
  Products.updateById(productId, updatedObject).then(function (result) {
    if (result.status == 'error') res.status(400).send(result.message);
    else res.status(200).send(result);
  });
});

router.delete('/:id', async function (req, res) {
  let productId = parseInt(req.params.id);
  Products.deleteById(productId).then(function (result) {
    if (result.status == 'error') res.status(400).send(result.message);
    else res.status(200).send(result);
  });
});

export default router;