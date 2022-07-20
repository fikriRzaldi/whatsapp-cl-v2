import * as firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyATrL_9KTx2iE0bK0WRzdP-wUBtjReTUx8",
  authDomain: "whatsapp-2-cd256.firebaseapp.com",
  projectId: "whatsapp-2-cd256",
  storageBucket: "whatsapp-2-cd256.appspot.com",
  messagingSenderId: "1003661472086",
  appId: "1:1003661472086:web:0820426a80d44219a326f7",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
