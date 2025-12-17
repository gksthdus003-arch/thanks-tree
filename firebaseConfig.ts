import { initializeApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrdnDnZoHBLaKpLgwjRT-5uGlbpw64rOk",
  authDomain: "thanks-tree-1ffc6.firebaseapp.com",
  projectId: "thanks-tree-1ffc6",
  storageBucket: "thanks-tree-1ffc6.firebasestorage.app",
  messagingSenderId: "896823885112",
  appId: "1:896823885112:web:0c674285818ca3136a15cd"
};

let db: Firestore | null = null;

try {
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch (error) {
  console.warn("Firebase initialization failed. Using fallback mode.", error);
}

export { db };