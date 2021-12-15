import { sqlite3Db } from "../config.js";

export default class Chats {
  constructor() {
    sqlite3Db.schema.hasTable('messages')
      .then(function (result) {
        if (!result) {
          sqlite3Db.schema.createTable('messages', table => {
            table.increments();
            table.string('email').notNullable();
            table.string('message').notNullable();
            table.dateTime('date').notNullable().defaultTo(Date.now());
          }).then(function (response) {
            console.log('Messages table created', response);
          });
        }
      })
  };

  saveMessage = async function (message) {
    try {
      let newMessage = await sqlite3Db.table('messages').insert(message);
      return { status: 'success', payload: newMessage };
    } catch (error) {
      return { status: 'error', message: error.message }
    }
  };

  getAll = async function () {
    try {
      let messages = await sqlite3Db.select().table('messages')
      return { status: 'success', payload: messages };
    } catch (error) {
      return { status: 'error', message: error }
    }
  };
}