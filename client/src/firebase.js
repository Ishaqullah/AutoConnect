// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVtUgN1vs22jq_F8bsEu3ItgLV71EAN8g",
  authDomain: "autoconnect-8aadd.firebaseapp.com",
  projectId: "autoconnect-8aadd",
  storageBucket: "autoconnect-8aadd.appspot.com",
  messagingSenderId: "170595860577",
  appId: "1:170595860577:web:a33a9195f573d0d9bf6a20"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const storage = getStorage();
export const db =getFirestore(app);