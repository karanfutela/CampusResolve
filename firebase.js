import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCaT2Nk8pqL114C76f1wF9btkFFqd8tE5o",
  authDomain: "campusresolve-8c325.firebaseapp.com",
  projectId: "campusresolve-8c325",
  storageBucket: "campusresolve-8c325.firebasestorage.app",
  messagingSenderId: "867147946996",
  appId: "1:867147946996:web:92ff1afdb139484b48f7a1"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
