import express from 'express';
import { chats } from '../daos/index.js';
import { io } from '../app.js';

const chatRouter = express.Router();

chatRouter.post('/', function (req, res) {
  let message = req.body;
  message.sender.avatar = "https://image.pngaaa.com/288/1721288-middle.png"
  
  chats.saveOne(message)
    .then(function (result) {
      if (result.status == 'success')
        chats.getChats()
          .then(function (messages) {
            io.emit('chat', messages);
          })
        res.send(result)
    });
});

export default chatRouter;