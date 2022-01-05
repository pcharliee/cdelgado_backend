// import express from 'express';
// import Chats from '../services/Chat.js';
// import { io } from '../app.js';
// const chatRouter = express.Router();
// const chatsServices = new Chats();

// chatRouter.post('/', function (req, res) {
//   let message = req.body
//   chatsServices.saveMessage(message)
//     .then(function (result) {
//       if (result.status == 'success')
//       chatsServices.getAll()
//         .then(function (messages) {
//           io.emit('chat', messages);
//         })
//       res.send(result)
//     })
// })

// export default chatRouter;