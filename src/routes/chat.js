import express from 'express';
import chatContainer from '../classes/chat_container.js';
import { io } from '../app.js';
const chatRouter = express.Router();
const Chats = new chatContainer();

chatRouter.post('/', function (req, res) {
  let date = new Date()
  let message = req.body
  message.date = date.toISOString();
  Chats.saveMessage(message)
    .then(function (result) {
      if (result.status == 'success')
      Chats.getAll()
        .then(function (messages) {
          io.emit('showMessages', messages);
        })
      res.send(result)
    })
})

export default chatRouter;