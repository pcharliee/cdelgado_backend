import express from 'express';
import upload from '../services/upload.js';
import sessionController from '../controllers/sessions.js';
import { passportCall } from '../utils/middlewares.js';
const router = express.Router();

router.get('/current', passportCall('jwt'), sessionController.getCurrentUser);
router.get('/logout', sessionController.logout);
router.get('/auth/facebook', passportCall('facebook'));

router.post('/register',
  [ upload.single('avatar'), passportCall('register') ],
  sessionController.register
);
router.post('/login', passportCall('login'), sessionController.login);

export default router;
