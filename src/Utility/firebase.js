
import firebase from "firebase/compat/app";
import {getAuth} from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8GpcGIZ7Mc0DR-oZ32XAP0K5fkNSzUsk",
  authDomain: "e-clone-40163.firebaseapp.com",
  projectId: "e-clone-40163",
  storageBucket: "e-clone-40163.appspot.com",
  messagingSenderId: "1038725408253",
  appId: "1:1038725408253:web:3104464af8010a6548a594",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();
