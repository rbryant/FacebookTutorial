// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDj2pvOmWWfODBM1HFpJYFkK3ED3ZpdPw",
  authDomain: "plead-9154f.firebaseapp.com",
  projectId: "plead-9154f",
  storageBucket: "plead-9154f.appspot.com",
  messagingSenderId: "720417488893",
  appId: "1:720417488893:web:d23000d290ecb09438e394"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
