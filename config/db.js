const config = require('./index');
const firebase = require('firebase-admin');


//initializing firebase app
firebase.initializeApp(config.firebaseConfig)


//initializing database (real-time database)
const db = firebase.database();

module.exports = db;