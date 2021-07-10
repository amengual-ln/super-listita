import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyAe-41ntcyJzTI6k7i9UoVPcUGZ4OZKsKo",
  authDomain: "compras-42.firebaseapp.com",
  projectId: "compras-42",
  storageBucket: "compras-42.appspot.com",
  messagingSenderId: "707763963860",
  appId: "1:707763963860:web:97fabde897f15d66767841",
  measurementId: "G-0J69EBCEVF",
};

const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore(); 
