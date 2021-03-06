import { products, carts } from '../daos/index.js';
import sendWhatsapp from '../utils/twilio.js';
import ProductsDto from '../dto/products.js';

const getProducts = function (req, res) {
  products.getAll().then(function (result) {
    if (result.status == 'error')
      return res.status(400).send(result.message);
    
    let parsedProducts = result.payload.map(function (product) {
      return new ProductsDto(product);
    });
    return res.status(200).send(parsedProducts);
  });
};

const getProductById = async function (req, res) {
  let productId = req.params.id;
  products.getById(productId).then(function (result) {
    if (result.status == 'error') return res.status(400).send(result.message);
    return res.status(200).send(new ProductsDto(result.payload));
  });
};

const checkout = async function (req, res) {
  let order = req.body;
  await sendWhatsapp(order);
  await order.products.forEach(function (product) {
    carts.deleteCartItem(order.cartId, product.id);
  });

  res.send({ message: 'Checkout was successfull' });
};

const addProduct = function (req, res) {
  let file = req.file;
  let newObject = req.body;
  newObject.thumbnail = file.location;
  products.saveOne(newObject)
    .then(result => {
      res.send(result);
    });
};

const updateProduct = function (req, res) {
  let productId = req.params.id;
  let updatedObject = req.body;
  products.updateById(productId, updatedObject).then(function (result) {
    if (result.status == 'error') res.status(400).send(result.message);
    else res.status(200).send(result);
  });
};

const deleteProduct = async function (req, res) {
  let productId = req.params.id;
  products.deleteById(productId).then(function (result) {
    if (result.status == 'error') res.status(400).send(result.message);
    else res.status(200).send(result);
  });
};

export default {
  getProducts,
  getProductById,
  checkout,
  addProduct,
  updateProduct,
  deleteProduct,
};
