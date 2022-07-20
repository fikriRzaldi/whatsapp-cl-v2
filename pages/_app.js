import "../styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import Login from "./login";
import Loading from "../components/Loading";
import * as firebase from "firebase/app";
import {
  setDoc,
  collection,
  getDocs,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  const data = async () => {
    await setDoc(
      doc(db, "users", user.uid),
      {
        email: user.email,
        lastSeen: serverTimestamp(),
        photoUrl: user.photoURL,
      },
      { merge: true }
    );
  };

  useEffect(() => {
    if (user) {      
      data();
    }
  }, [user]);

  if (loading) return <Loading />;
  if (!user) return <Login />;

  return <Component {...pageProps} />;
}

export default MyApp;
