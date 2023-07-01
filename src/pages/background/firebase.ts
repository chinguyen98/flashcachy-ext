// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5PyM94XTuaq8drQamssPLfnlXL-QCH2A",
  authDomain: "flashcachy.firebaseapp.com",
  projectId: "flashcachy",
  storageBucket: "flashcachy.appspot.com",
  messagingSenderId: "261402170721",
  appId: "1:261402170721:web:43146fd82bf3dd6f996120",
  measurementId: "G-5VEEDSL2XS",
};

// Initialize Firebase
export const initFirebase = () => {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  console.log("Firebase loaded!");

  return db;
};
