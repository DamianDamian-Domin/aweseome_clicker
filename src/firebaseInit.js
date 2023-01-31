// src/firebaseInit.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDVUHfqVw2wozfUTVZ2DT5m9rjOjSX71iI",
    authDomain: "bulb-clicker.firebaseapp.com",
    databaseURL: "https://bulb-clicker-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "bulb-clicker",
    storageBucket: "bulb-clicker.appspot.com",
    messagingSenderId: "87968213067",
    appId: "1:87968213067:web:9f87bb021efb59c21b45ce",
    measurementId: "G-9EPG8915LV"
  };

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export default app