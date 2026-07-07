// Firebase App
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

// Firebase Authentication
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// Cloud Firestore
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    updateDoc,
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAWk5pq3Hn_gePraWuvIOHIyZIHGEl9BcA",
    authDomain: "somc-project.firebaseapp.com",
    projectId: "somc-project",
    storageBucket: "somc-project.firebasestorage.app",
    messagingSenderId: "857124189553",
    appId: "1:857124189553:web:d0f0359e3ee480d458b2d0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
const auth = getAuth(app);
const db = getFirestore(app);

// Export
export {
    auth,
    db,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    doc,
    setDoc,
    getDoc,
    updateDoc,
    collection,
    getDocs
};
