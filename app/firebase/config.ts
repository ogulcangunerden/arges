import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getFirestore,
  enableMultiTabIndexedDbPersistence,
} from "firebase/firestore";

// Debug logging for firebase config
console.log("Firebase projectId:", process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Debug logging for the entire config
console.log("Firebase config:", { ...firebaseConfig, apiKey: "[REDACTED]" });

// Initialize Firebase
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);

// Only enable persistence in development environment
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  try {
    enableMultiTabIndexedDbPersistence(db).catch((err) => {
      console.warn("Firebase persistence error:", err.code, err.message);
      console.warn("Application will fallback to memory persistence");
    });
  } catch (err) {
    console.warn("Could not enable persistence:", err);
    console.warn("Application will fallback to memory persistence");
  }
}
