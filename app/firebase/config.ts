import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import {
  getFirestore,
  enableMultiTabIndexedDbPersistence,
  Firestore,
} from "firebase/firestore";

// Debug logging for environment info
console.log("Environment:", process.env.NODE_ENV);
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
let app: FirebaseApp;
let db: Firestore;

try {
  console.log("Initializing Firebase app...");
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  console.log("Firebase app initialized successfully");
  db = getFirestore(app);
  console.log("Firestore initialized successfully");
} catch (error) {
  console.error("Error initializing Firebase:", error);
  throw error;
}

// Export the Firebase app and db
export { app, db };
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
