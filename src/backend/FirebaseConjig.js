// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPfEFOQKyeYSs4lCDMtwXMGdo2Y2s6wIk",
  authDomain: "innovators-hub-music-a3fdc.firebaseapp.com",
  projectId: "innovators-hub-music-a3fdc",
  storageBucket: "innovators-hub-music-a3fdc.firebasestorage.app",
  messagingSenderId: "563589777354",
  appId: "1:563589777354:web:a69c9aac7ee60cc4a97133"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const __AUTH=getAuth(firebaseApp)
export const __DB=getFirestore(firebaseApp)