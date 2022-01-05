import admin from 'firebase-admin';
import config from './config.js';

admin.initializeApp({
  credential: admin.credential.cert(config),
  databaseURL: `https://${config.project_id}.firebaseio.com`
});