import { carts, users } from '../daos/index.js';
import ProductsDto from '../dto/products.js';

const getCarts = function (req, res) {
  carts.getAll().then(function (result) {
    if (result.status == 'error') res.status(400).send(result.message);
    else res.status(200).send(result.payload);
  });
};

const getCartById = function (req, res) {
  let cartId = req.params.id;
  carts.getById(cartId).then(function (result) {
    const parsedProducts = result.payload.products.map(function (product) {
      return new ProductsDto(product);
    }) 
    let response = {
      id: result.payload._id,
      products: parsedProducts
    };
    if (result.status == 'error') return res.status(400).send(result.message);
    res.status(200).send(response);
  });
};

const createCart = function (req, res) {
  carts.saveOne().then(function (result) {
    if (result.status == 'error') return res.status(400).send(result.message);
    res.status(200).send(result);
  })
};

const addToCart = function (req, res) {
  let cartId = req.params.id;
  let newItemId = req.body.id;
  carts.saveToCart(cartId, newItemId).then(function (result) {
    if (result.status == 'error') res.status(400).send(result.message);
    else res.status(200).send(result);
  });
};

const deleteCart = function (req, res) {
  let cartId = req.params.id;
  carts.deleteById(cartId).then(function (result) {
    if (result.status == 'error') res.status(400).send(result.message);
    else res.status(200).send(result.message);
  });
};

const deleteCartItem = function (req, res) {
  let cartId = req.params.id;
  let productId = req.params.id_prod;

  carts.deleteCartItem(cartId, productId).then(function (result) {
    if (result.status == 'error') res.status(400).send(result.message);
    else res.status(200).send(result);
  });
};

export default {
  getCarts,
  getCartById,
  createCart,
  addToCart,
  deleteCart,
  deleteCartItem,
};
