import MongoContainer from '../containers/Mongo_container.js';
import { collectionRef, UsersSchema } from '../daos/mongoose/models/users.js';

export default class UserMongo extends MongoContainer {
  constructor() {
    super(collectionRef, UsersSchema, { timestamps: true });
  };
  //NOTE: maybe delete as it was for facebook...
  getByEmailOrCreate = async function (userFb) {
    try {
      let user = await this.collection.findOne({ email: userFb.email });
      if (!user) {
        try {
          let user = await this.collection.create(userFb)
          return user
        } catch (error) {
          return { status: 'error', message: `Saving error; ${error}` } 
        }
      }
      return user;
    } catch (error) {
      return { status: 'error', message: `Something went wrong. Error: ${error}`}
    }
  };
};
