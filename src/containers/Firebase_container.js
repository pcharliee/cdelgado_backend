import db from '../daos/firebase/firebase.js';

export default class FirebaseContainer {
  constructor(collection) {
    this.collection = db.collection(collection);
  }

  getAll = async function () {
    try {
      const data = await this.collection.get();
      const docs = data.docs;
      const formattedDocs = docs.map(function (doc) {
        return doc.data();
      });
      return { status: 'success', payload: formattedDocs };
    } catch (error) {
      return { status: 'error', message: 'An error occurred' };
    }
  }

  getById = async function (objectId) {
    try {
      const data = await this.collection.doc(objectId);
      const doc = await data.get();
      if (!doc.exists) 
        return { status: 'error', message: `No item found with ID: ${objectId}` };

      return { status: 'success', payload: doc.data() };
    } catch (error) {
      return { status: 'error', message: 'An error occurred' };
    }
  }

  deleteById = async function (objectId) {
    try {
      const data = await this.collection.doc(objectId).delete();
      return { status: 'success', message: 'Successfully deleted', payload: data };
    } catch (error) {
      return { status: 'error', message: 'An error occurred' };
    }
  }
}