const express = require('express');
const router = express.Router();
const Container = require('../classes/Container');
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

router.post('/', (req, res) => {
  let newObject = req.body;
  console.log('newObject', newObject)
  Products.saveProduct(newObject).then(result => {
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

module.exports = router;