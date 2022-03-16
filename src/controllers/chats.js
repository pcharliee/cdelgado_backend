import { chats } from '../daos/index.js';
import { io } from '../app.js';

const postMessage = function (req, res) {
  let message = req.body;
  //NOTE: update to get user's avatar
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
};

export default {
  postMessage,
};
