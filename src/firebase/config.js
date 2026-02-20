// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKETw5Fvip8xh-ev_EeV1nlLkVYaBI6DM",
  authDomain: "elitefit-db.firebaseapp.com",
  projectId: "elitefit-db",
  storageBucket: "elitefit-db.firebasestorage.app",
  messagingSenderId: "760818042969",
  appId: "1:760818042969:web:5e9cb4df0014d7f7e04948",
  measurementId: "G-HQD56P7LD7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Analytics lazily (only when needed in browser)
let analytics = null;
const getAnalyticsInstance = async () => {
  if (typeof window !== 'undefined' && !analytics) {
    try {
      const { getAnalytics } = await import("firebase/analytics");
      analytics = getAnalytics(app);
    } catch (error) {
      console.warn('Firebase Analytics initialization failed:', error);
    }
  }
  return analytics;
};

export { app, db, getAnalyticsInstance };
