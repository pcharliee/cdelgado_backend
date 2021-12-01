import fs from 'fs';
export default class chatContainer {

  async saveMessage(newObject) {
    try {
      let data = await fs.promises.readFile('./files/chatlog.json', 'utf-8');
      let messages = JSON.parse(data);
      messages.push(newObject);
      try {
        await fs.promises.writeFile('./files/chatlog.json', JSON.stringify(messages, null, 2));
        return { status: 'success', message: 'Message added'};
      } catch (error) {
        return { status: 'error', message: 'Try again later'};
      }
    } catch (error) {
      await fs.promises.writeFile('./files/chatlog.json', `[${JSON.stringify(newObject, null, 2)}]`);
      return { status: 'success', message: 'New chat log created'};
    }
  };

  async getAll() {
    try {
      let data = await fs.promises.readFile('./files/chatlog.json', 'utf-8');
      if (!data) throw new Error();
      let messages = JSON.parse(data);
      return { status: 'success', payload: messages };
    } catch (error) {
      console.log('error', error);
      let date = new Date();
      let systemMessage = {
        email: 'system',
        message: 'Welcome, how can we help you?',
        date: date.toISOString()
      }
      await fs.promises.writeFile('./files/chatlog.json', `[${JSON.stringify(systemMessage, null, 2)}]`);
      return { status: 'error', payload: 'File is empty'};
    }
  };
};