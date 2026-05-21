import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "placeholder-api-key",
  authDomain: "daily-utility-hub.firebaseapp.com",
  projectId: "daily-utility-hub",
  storageBucket: "daily-utility-hub.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };