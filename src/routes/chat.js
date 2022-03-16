import express from 'express';
import chatController from '../controllers/chats.js';

const chatRouter = express.Router();

chatRouter.post('/', chatController.postMessage);

export default chatRouter;
