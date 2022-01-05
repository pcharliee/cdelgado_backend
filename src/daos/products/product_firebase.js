import FirebaseContainer from "../../containers/Firebase_container.js";
import validateNewProduct from "../firebase/validate_product.js";

export default class ProductFirebase extends FirebaseContainer {
  constructor() {
    super('products');
  }

  saveOne = async function (product) {
    try {
      const data = await this.collection.get();
      const products = data.docs;
      const formattedProducts = products.map(doc => doc.data());
      const existing = formattedProducts.find(prod => {
        return prod.title == product.title;
      })
      
      if (existing) 
        return { status: 'error', message: `Already exists, try updating. Ref: ${existing.id}` };
      let doc = this.collection.doc();

      await validateNewProduct(product);
      await doc.set({ id: doc.id, ...product });

      return { status: 'success', message: 'Product successfully saved', payload: doc.id };
    } catch (error) {
      return { status: 'error', message: `Could not save product.`, error };
    }
  };

  updateById = async function (productId, update) {
    try {
      const doc = this.collection.doc(productId);
      await doc.update(update);
      return { status: 'success', message: 'Successfully updated' };
    } catch (error) {
      return { status: 'error', message: `Could not update document: ${error}`,  };
    }
  }
};