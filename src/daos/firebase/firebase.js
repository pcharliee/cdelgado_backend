import admin from 'firebase-admin';
import config from '../../database/firebase/config.js'

admin.initializeApp({
  credential: admin.credential.cert(config),
  databaseURL: `https://${config.project_id}.firebaseio.com`
})

const db = admin.firestore();

export default db;