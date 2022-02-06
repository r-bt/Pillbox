// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyCogzGEAHHMbIB7wKi3Q21_u2EXCZLo37Y",

  authDomain: "pillbox-7c41a.firebaseapp.com",

  databaseURL: "https://pillbox-7c41a-default-rtdb.firebaseio.com",

  projectId: "pillbox-7c41a",

  storageBucket: "pillbox-7c41a.appspot.com",

  messagingSenderId: "892609465479",

  appId: "1:892609465479:web:7712d005f4af84ac6b3c22"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

export default app;