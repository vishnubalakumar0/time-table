// src/utils/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCKZbhoyJ-sE2B2PBF3L2BfjwjBI81k744",
  authDomain: "timetable-1c2c6.firebaseapp.com",
  projectId: "timetable-1c2c6",
  storageBucket: "timetable-1c2c6.firebasestorage.app",
  messagingSenderId: "157226793900",
  appId: "1:157226793900:web:d8d7f39b423e0bdf339809",
  measurementId: "G-3GWGVFNYLQ",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
