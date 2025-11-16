// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCKZbhoyJ-sE2B2PBF3L2BfjwjBI81k744",
  authDomain: "timetable-1c2c6.firebaseapp.com",
  projectId: "timetable-1c2c6",
  storageBucket: "timetable-1c2c6.firebasestorage.app",
  messagingSenderId: "157226793900",
  appId: "1:157226793900:web:d8d7f39b423e0bdf339809",
  measurementId: "G-3GWGVFNYLQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth & Firestore so we can use them in the app
export const auth = getAuth(app);
export const db = getFirestore(app);
