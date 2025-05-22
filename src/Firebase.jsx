// firebase setup 
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAqtpfchjJU1EIvAVMbNfsZqOsfirJ0zv0",
  authDomain: "arogyam-e0e91.firebaseapp.com",
  projectId: "arogyam-e0e91",
  storageBucket: "arogyam-e0e91.firebasestorage.app",
  messagingSenderId: "397647930320",
  appId: "1:397647930320:web:b4cfa92843e9f8f26b0fd5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Init services
export const auth = getAuth(app);
export const db = getFirestore(app); 
// export {auth};