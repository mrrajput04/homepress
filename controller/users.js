const admin = require('firebase-admin');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
const { initializeApp } = require('firebase/app');
const { userService } = require('../services')
const config = require('../config')
admin.initializeApp({
  credential: admin.credential.cert({
    type: 'service_account',
    project_id: 'homepress1-829a8',
    private_key_id: '0192d6e419587cb22bc06628b470bd0cc6fe17a6',
    private_key:
      '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCrgj6Et8ySJ8sR\n75TXQrOwaJ9yo+hH4QPwiEmYvf29Yx2LKUOSh4XMnLQ8stXeuJvjJEWn2SXWP70+\nGGy5UzCWQM1F4zsnkHewp8eBCVNOTlyCZkJjHG6pH8Mr+VWa+JzUFo00YAu01YwT\nRmPfZiLiuiOTM0hfLRN4Ywu9B9ypjdSdCh9tenH+/Pkv/d+hkdvN1qPI31xtG1dp\npbntAiqskni/CJL4c1KmYWeK4UgTCmahecwefCvaO8Hq8vwYEEEUOrUMrbAW0V1R\nO2cibG3wBK4Binv6RPj5E5Q+2zORbZxO4RcXtO8TigNUtzNRLAP5nGFg3JyGkq7C\nuF8aGOQLAgMBAAECggEAALblLcZaOs2hoex+kTr85qI479BQ+mOskYbvz4wTD4Pn\nLpo4ZtbbrtOESLByBaB9Pb/77kwQRUk0r5qIcWkwTZ/tevoMWAjZBspcIWR5jVz0\nM7LbWfBXYar5NCiwu5mHhbamVe6EffdZwwbLCbYyNQGTflx7U7IrX5gCB4KN38Lu\nu3dvNtbv5EdztiFFCOo5YBR/zksBhohz4EPdRDpgnAyllso+havfn0QLNsQK2xRh\n74rHCOTo766J+rNA30MSse0cS/Rxf29LJqi4k3pxHg4oZhJA5wONg/IY7wpQe0W7\nsHX1CRl+mNv6Y88wqQaD+WqOYcS5/wUUlrvvj1tSQQKBgQDoi9aoT5ZRrmNXkzsD\nraJ8cN2xvxBoqKUhyEvkpBG89ZFOWCQpS+TIjZsC6p8+ix4pBxB/TN2b71V9bK1T\nyIQXDoyBR+km8a7nYfvgZ9bQqZlj07If17yLVUhcZposOLdsN4wlEZT+clxLAIdR\nwtDWYuuQWmn2JOMHcCQLzBeyoQKBgQC8zndH+S2FYwhKy6pS3w/rvL0JrSZUySu+\nzarqxB2XgzBkIaga++SJB0V5b0F0UU+gIqamNgIe1dLknt/Ylt3Jb9OAmeA+PbYS\nlGiQ22NbKveF+piedoBuHC+rDmjcmTaxUN1jb5dQ4ke+J5Hm+vfHcK8hXY4QlTB9\nTHYK00YDKwKBgE6ZTUFwPQd4oN0tx0mT+5KB93ynbp1hOwczEuvBxLkQaz+GrRpE\nK5zZt+YBdTeHf/cwCxRr349gEo4lGGR0JqlAYp8jthtSnuJYDPEpR8MZP94s5Ey8\n915EwgNxLnT56o0qLTUuPyTNdIJpOFObPEjqAGK3HI90okOWVKikH/JhAoGACoJz\noU39eq9IhuFPWc2Q1U5sN12sBIwuIzDPksHX49cpmmlFMjtTPU1qUJggzJi6Fe/X\n1uiqtYyxcIhnbWb4cX4IB+CI2u4UdHROXcHYhfqeTJbmZ+uwunBXNu5WZ/EfWj9m\nE2LiyV3PIIaTWIgfwrpDBVhvz/x99nuLFo8sFoECgYEAgmlAqZF0My+2kOJ0GoNg\n6PrC6hgk3hkoWtlld+3d9a37sBgRQX9QpGD1Wycn3F54q2YhvG+Seuv8Zff3LkNW\nSqBdJZyj543EQhkrZlNWeXt0BQdxvpV2f9E6ks0BGKGs90b8mnBxebs+T0BF5qsL\nZr3NVUlr7lTQPtg9JOFNs/I=\n-----END PRIVATE KEY-----\n',
    client_email:
      'firebase-adminsdk-87ky4@homepress1-829a8.iam.gserviceaccount.com',
    client_id: '117766446203009376842',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url:
      'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-87ky4%40homepress1-829a8.iam.gserviceaccount.com',
  }),
});

// Initialize Firebase
const app = initializeApp(config.firebaseConfig);
const auth = getAuth(app);

const userController = {
  async create(req, res, next) {
    try {
      const user = await admin.auth().createUser(req.body);
      const role = req.body.role;
      if (role) {
        await admin.auth().setCustomUserClaims(user.uid, { role });
      } else {
        await admin.auth().setCustomUserClaims(user.uid, { role: 'user' });
      }
      userService({...req.body, userId: user.uid});
      return res.status(201).json({ ...user, message:"register successfully"});
    } catch (e) {
      console.error(e);
      return res.status(500).json({
        ...e,
      });
    }
  },

  async login(req, res, next) {
    if (!req.body || !req.body.email || !req.body.password)
      return res.status(400).json({ message: 'email and password required' });
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        req.body.email,
        req.body.password,
      );
      res
        .status(200)
        .json({ message: 'login successful', ...user });
    } catch (e) {
      console.error(e);
      return res.status(500).json({
        ...e,
      });
    }
  },
}

module.exports = userController;
