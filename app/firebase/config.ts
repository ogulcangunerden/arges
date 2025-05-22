import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import {
  getFirestore,
  enableMultiTabIndexedDbPersistence,
  Firestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
let app: FirebaseApp;
let db: Firestore;

try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  db = getFirestore(app);
} catch (error) {
  if ((process.env.NODE_ENV as string) !== "production") {
    console.error("Error initializing Firebase:", error);
  }
  throw error;
}

// Export the Firebase app and db
export { app, db };
// Only enable persistence in development environment
if (
  typeof window !== "undefined" &&
  (process.env.NODE_ENV as string) === "development"
) {
  try {
    enableMultiTabIndexedDbPersistence(db).catch((err) => {
      if ((process.env.NODE_ENV as string) !== "production") {
        console.warn("Firebase persistence error:", err.code, err.message);
      }
    });
  } catch (err) {
    if ((process.env.NODE_ENV as string) !== "production") {
      console.warn("Could not enable persistence:", err);
    }
  }
}
