// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB5I1LIu-XStwkRnHrVQVeMvzZe-_UgNEg",
  authDomain: "smart-flix-f92b3.firebaseapp.com",
  projectId: "smart-flix-f92b3",
  storageBucket: "smart-flix-f92b3.firebasestorage.app",
  messagingSenderId: "745797126925",
  appId: "1:745797126925:web:e60b9c40fdd10d7248fe44",
};

// Initialize Firebase once (avoids "duplicate app" errors during hot reload)
export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
