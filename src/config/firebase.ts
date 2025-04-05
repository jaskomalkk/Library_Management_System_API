import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';

dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY!)),
  databaseURL: "https://your-firebase-database-url.firebaseio.com",
});

export const db = admin.firestore();
