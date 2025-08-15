// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "cs-academica",
  "appId": "1:140476869926:web:6bc3155f91b8cf3bfe25e7",
  "storageBucket": "cs-academica.firebasestorage.app",
  "apiKey": "AIzaSyCkn-SHGgIvaxZ172GP5s5KA1TAQh0tYh0",
  "authDomain": "cs-academica.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "140476869926"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
