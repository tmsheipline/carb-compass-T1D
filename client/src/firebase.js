import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// Paste your Firebase config here from:
// Firebase Console > Project Settings > Your Apps > Web App > SDK setup
const firebaseConfig = {
  apiKey: "AIzaSyAUz8XaScGpIRyTrq-L7X1Ot_XA6YnwDZs",
  authDomain: "carbcompass.firebaseapp.com",
  projectId: "carbcompass",
  storageBucket: "carbcompass.firebasestorage.app",
  messagingSenderId: "685728881194",
  appId: "1:685728881194:web:195c103ee9e0a4b1f64153",
  measurementId: "G-4TZ109NKBD"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
