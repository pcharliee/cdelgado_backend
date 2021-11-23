import express from 'express';
import Container from '../../classes/Container.js';
const router = express.Router();
const Products = new Container();

router.get('/', function (req, res) {
  Products.getAll().then(function (result) {
    if (result.status == 'error') res.status(400).send('File is empty');
    else res.status(200).send(result.payload);
  });
});

router.post('/', (req, res) => {
  let newObject = req.body;
  console.log('newObject', newObject)
  Products.saveProduct(newObject).then(result => {
    res.send(result);
  });
});

export default router;