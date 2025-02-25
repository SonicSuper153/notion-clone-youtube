// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUhc26tKCTVjiIyf3Hb27Hl2lmJt_yAhk",
  authDomain: "notio-e6248.firebaseapp.com",
  projectId: "notio-e6248",
  storageBucket: "notio-e6248.firebasestorage.app",
  messagingSenderId: "399666986032",
  appId: "1:399666986032:web:11138de69de547db6301f5",
  measurementId: "G-X6B1S3TLMJ"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
// const analytics = getAnalytics(app);

export { db };
