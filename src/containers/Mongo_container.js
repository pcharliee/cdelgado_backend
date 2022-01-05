import mongoose from 'mongoose';
import config from '../config.js';
mongoose.connect(config.mongo.baseUrl, config.mongo.options);

export default class MongoContainer {
  constructor(collection, schema, timestamps) {
    this.collection = mongoose.model(collection, new mongoose.Schema(schema, timestamps))
  }

  getAll = async function () {
    try {
      let documents = await this.collection.find();
      return { status: 'success', payload: documents };
    } catch (error) {
      return { status: 'error', message: 'An error occurred: ', error };
    }
  }

  getById = async function (id) {
    try {
      let document = await this.collection.findOne({ _id: id });

      if (!document)
        return { status: 'success', message: `Nothing found for ID: ${id}` };

      return { status: 'success', payload: document };
    } catch (error) {
      return { status: 'error', message: 'An error occurred: ', error };
    }
  }

  saveOne = async function (object) {
    try {
      let result = await this.collection.create(object);
      return { status: 'success', message: 'Successfully added', payload: result };
    } catch (error) {
      return { status: 'error', message: 'Error while saving: ', error };
    }
  }

  deleteById = async function (id) {
    try {
      let document = await this.collection.deleteOne({ _id: id });
      return { status: 'success', message: 'Successfully deleted', payload: document };
    } catch (error) {
      return { status: 'error', message: 'An error occurred: ', error };
    }
  }
}