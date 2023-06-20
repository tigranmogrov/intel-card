import { getAuth } from "firebase/auth";
import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiKxPj7nOkXcoIlRgJTw-y0mEFhcmjp2I",
  authDomain: "intelli-card.firebaseapp.com",
  projectId: "intelli-card",
  storageBucket: "intelli-card.appspot.com",
  messagingSenderId: "442588417343",
  appId: "1:442588417343:web:b3957acadb2fb2b374978a",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const auth = getAuth(app);

export { app, auth, database };
