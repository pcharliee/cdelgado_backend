import MongoContainer from '../../containers/Mongo_container.js';
import { collectionRef, UsersSchema } from '../mongoose/models/users.js';

export default class UserMongo extends MongoContainer {
  constructor() {
    super(collectionRef, UsersSchema, { timestamps: true });
  };
  getUser = async function (username) {
    try {
      let user = await this.collection.findOne({ username: username });
      return user;
    }
    catch (error) {
      return { status: 'error', message: `Something went wrong. Error: ${error}`}
    }
  }
}
