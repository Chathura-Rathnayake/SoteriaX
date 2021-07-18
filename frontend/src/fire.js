import firebase from 'firebase';
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBj0ibxdXZljkxf970bPPr47j1qsBjBONI",
  authDomain: "soteriax-7cadf.firebaseapp.com",
  projectId: "soteriax-7cadf",
  storageBucket: "soteriax-7cadf.appspot.com",
  messagingSenderId: "295366417844",
  appId: "1:295366417844:web:734d8b40831c13a1a226e1"
};
// Initialize Firebase

export const fire = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

