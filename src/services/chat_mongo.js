import MongoContainer from "../containers/Mongo_container.js";
import { collectionRef, MessagesSchema } from "../daos/mongoose/models/chats.js";
import { normalize, denormalize, schema } from 'normalizr';

export default class ChatMongo extends MongoContainer {
  constructor() {
    super(collectionRef, MessagesSchema, { timestamps: true });
  }
  getChats = async function () {
    try {
      let documents = await this.collection.find();
      const users = new schema.Entity('users');
      const comments = new schema.Entity('messages', { sender: users });
      const texts = new schema.Entity('posts', { messages: [ comments ] });
      const originalData = JSON.parse(JSON.stringify({ id: '1', messages: documents }))

      const normalizedData = normalize(originalData, texts)

      return { status: 'success', payload: normalizedData };
    } catch (error) {
      return { status: 'error', message: 'An error occurred: ', error }
    }
  }
};