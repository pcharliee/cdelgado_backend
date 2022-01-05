import admin from 'firebase-admin';
import FirebaseContainer from "../../containers/Firebase_container.js";

export default class CartFirebase extends FirebaseContainer {
  constructor() {
    super('carts');
  }
  
  saveOne = async function () {
    try {
      let doc = this.collection.doc();
      let newCart = {
        id: doc.id,
        products: []
      }
      await doc.set(newCart);
      return { status: 'success', message: 'Cart successfully created', payload: doc.id };
    } catch (error) {
      return { status: 'error', message: 'Could not create cart' };
    }
  }

  saveToCart = async function (cartId, productId) {
    try {
      const doc = this.collection.doc(cartId);
      await doc.update({
        products: admin.firestore.FieldValue.arrayUnion(productId)
      });
      return { status: 'success', message: 'Product added to cart' };
    } catch (error) {
      return { status: 'error', message: `Could not update cart: ${error}` };
    }
  }

  deleteCartItem = async function (cartId, productId) {
    try {
      const doc = this.collection.doc(cartId);
      await doc.update({
        products: admin.firestore.FieldValue.arrayRemove(productId)
      });
      return { status: 'success', message: 'Product removed from cart' };
    } catch (error) {
      return { status: 'error', message: `Could not update cart: ${error}` }; 
    }
  }  
}