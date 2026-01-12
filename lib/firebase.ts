// lib/firebase.ts
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "FIREBASE_API_KEY",
  authDomain: "FIREBASE_PROJECT_ID.firebaseapp.com",
  projectId: "FIREBASE_PROJECT_ID",
  storageBucket: "FIREBASE_PROJECT_ID.appspot.com",
  messagingSenderId: "FIREBASE_SENDER_ID",
  appId: "FIREBASE_APP_ID",
};

// 🔴 ÇOK ÖNEMLİ: Expo reload'da double init olmasın diye
const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApp();

export const db = getFirestore(app);