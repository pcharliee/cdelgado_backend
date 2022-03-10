import mongoose from 'mongoose';
import config from '../config.js';
mongoose.connect(config.mongo.baseUrl, config.mongo.options).catch(error => console.log('ERROR => ', error));

export default class MongoContainer {
  constructor(collection, schema) {
    const mongoSchema = new mongoose.Schema(schema, { timestamps: true })
    mongoSchema.set('toJSON', {
      transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject.__v
      }
    })
    this.collection = mongoose.model(collection, mongoSchema)
  }

  getAll = async function () {
    try {
      let documents = await this.collection.find();
      return { status: 'success', payload: documents };
    } catch (error) {
      return { status: 'error', message: `Error while fetching: ${error}` };
    }
  }

  findOne = async function (option) {
    try {
      let result = await this.collection.findOne(option).populate('cart');
      return result;
    } catch (error) {
      return { status: 'error', message: `Error while fetching: ${error}` };
    }
  }

  getById = async function (id) {
    try {
      let document = await this.collection.findOne({ _id: id });

      if (!document)
        return { status: 'success', message: `Nothing found for ID: ${id}` };

      return { status: 'success', payload: document };
    } catch (error) {
      return { status: 'error', message: `Error while fetching: ${error}` };
    }
  }

  saveOne = async function (object) {
    try {
      let result = await this.collection.create(object);
      return { status: 'success', message: 'Successfully added', payload: result };
    } catch (error) {
      return { status: 'error', message: `Error while saving: ${error}` };
    }
  }

  deleteById = async function (id) {
    try {
      let document = await this.collection.deleteOne({ _id: id });
      return { status: 'success', message: 'Successfully deleted', payload: document };
    } catch (error) {
      return { status: 'error', message: `Error while deleting: ${error}` };
    }
  }
}
