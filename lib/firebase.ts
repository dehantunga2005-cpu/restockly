// Firebase core
import { initializeApp } from "firebase/app";

// Firebase services
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 🔐 Firebase config (SENİN VERDİĞİN – DOKUNMADIM)
const firebaseConfig = {
  apiKey: "AIzaSyDMNZIELVEPwMHdcbDd-LmcABkUZILSoLo",
  authDomain: "restockly-444e2.firebaseapp.com",
  projectId: "restockly-444e2",
  storageBucket: "restockly-444e2.firebasestorage.app",
  messagingSenderId: "63398377238",
  appId: "1:63398377238:web:d1a2c1e3f584bc05594237",
};

// 🚀 Firebase başlat
const app = initializeApp(firebaseConfig);

// 🔑 Servisleri export et
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;

