// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8t_2pFFr0r314WkxEtSjx9nPqz1nvkWc",
  authDomain: "plead-be7d9.firebaseapp.com",
  projectId: "plead-be7d9",
  storageBucket: "plead-be7d9.firebasestorage.app",
  messagingSenderId: "647865077085",
  appId: "1:647865077085:web:ef091eda1253ba5681ecb4",
  measurementId: "G-BZC2GM2WKB",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };

