import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAsVP2ylJa8qR436hh9qsRIyeZDz4696nk",
  authDomain: "hr-system-f60dd.firebaseapp.com",
  projectId: "hr-system-f60dd",
  storageBucket: "hr-system-f60dd.firebasestorage.app",
  messagingSenderId: "427655859826",
  appId: "1:427655859826:web:a29728a21de56323f8bceb",
  measurementId: "G-2K5KVH7M5J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const messaging = getMessaging(app);
export const storage = getStorage(app);
export const VAPID_KEY = "BImVY9oocAJQA4lSTyrTGkPAbuU_7LQF9f37fHfwR5qYFdCPyey4JjY7xd-y-ZpAgLQRi7PXZe3BD6EgkRWeA70";