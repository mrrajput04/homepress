require('dotenv').config();
const { PORT, API_KEY, STORAGEZONE1 } = process.env;

//firebase config
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};

module.exports = { PORT, firebaseConfig, STORAGEZONE1, API_KEY };
