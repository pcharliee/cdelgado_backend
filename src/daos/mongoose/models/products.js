import mongoose from 'mongoose';
const collectionRef = 'products';

const ProductsSchema = {
  title: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  thumbnail: { type: String },
  stock: { type: Number, default: 1 },
  price: { type: Number, required: true },
  code: { type: String, default: 'NP-0001' },
};

export { collectionRef, ProductsSchema };