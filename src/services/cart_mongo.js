import MongoContainer from "../containers/Mongo_container.js";
import { collectionRef, CartsSchema } from "../daos/mongoose/models/carts.js";

export default class CartMongo extends MongoContainer {
  constructor() {
    super(collectionRef, CartsSchema, { timestamps: true });
  }
  
  saveToCart = async function (cartId, productId) {
    try {
      let result = await this.collection.updateOne({ _id: cartId }, { $push: { products: productId } });
      return { status: 'success', message: 'Item added to cart', payload: result };
    } catch (error) {
      return { status: 'error', message: `No cart found with ID: ${cartId}` };
    };
  };

  deleteCartItem = async function (cartId, productId) {
    try {
      let cart = { _id: cartId };
      let query = { 
        $pull: {
          products: { $in: [ productId ] }
        }
      };
      let result = await this.collection.updateOne(cart, query);
      return { status: 'success', message: 'Item removed from cart', payload: result };
    } catch (error) {
      return { status: 'error', message: 'Could not remove item from cart' };
    };
  };
};