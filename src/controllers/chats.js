import { chats } from '../daos/index.js';
import { io } from '../app.js';

const postMessage = function (req, res) {
  let message = req.body;
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
