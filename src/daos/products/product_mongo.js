import MongoContainer from "../../containers/Mongo_container.js";
import { collectionRef, ProductsSchema } from "../mongoose/models/products.js";

export default class ProductMongo extends MongoContainer {
  constructor() {
    super(collectionRef, ProductsSchema, { timestamps: true });
  }

  updateById = async function (productId, update) {
    try {
      let result = await this.collection.updateOne({ _id: productId }, { $set: update });
      return { status: 'success', message: 'Product updated', payload: result };
    } catch (error) {
      return { status: 'error', message: `No product found for ID: ${productId}` };
    };
  };
};