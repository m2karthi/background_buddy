import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBnegO6bIGTph-rjZljRiEtb2qS73zXNY",
  authDomain: "examalteration-61691.firebaseapp.com",
  projectId: "examalteration-61691",
  storageBucket: "examalteration-61691.appspot.com",
  messagingSenderId: "1055503015404",
  appId: "1:1055503015404:web:b059378f4302ed6c8ab4c9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);



// Initialize Firebstore
const db = firebase.firestore();
//Initialize storage
// const st = firebaseApp.storage().ref();
// Authentication From Firebase
const auth = firebase.auth();
export {
  db,
  // st,
  auth
};