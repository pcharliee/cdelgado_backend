const express = require('express');
const app = express();
const PORT = process.env.PORT || 9090;
const Container = require('./classes/Container.js');
const Products = new Container('./files/contenedor.json');

const server = app.listen(PORT, function () {
  console.log(`Listing to port ${PORT}`);
});

server.on('error', function (error) {
  console.log(`Error: ${error}`);
});

app.get('/', function (req, res) {
  res.send('Test');
});

app.get('/products', function (req, res) {
  Products.getAll().then(function (result) {
    if (result.status == 'Error') res.status(400).send('File is empty');
    else res.status(200).send(result.payload);
  })
})

app.get('/productrandom', async function (req, res) {
  let currentProducts = await Products.getAll();
  let randomNumber = Math.ceil(Math.random() * currentProducts.payload.length);
  Products.getById(randomNumber).then(function (result) {
    if (result.status == 'Error') res.status(400).send(`No item with such ID`);
    else res.status(200).send(result.payload);
  });
});