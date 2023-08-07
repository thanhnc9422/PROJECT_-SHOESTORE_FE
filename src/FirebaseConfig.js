import { initializeApp } from "@firebase/app";
import { FacebookAuthProvider, getAuth } from "@firebase/auth";
import { getStorage } from "@firebase/storage";

import { current } from "@reduxjs/toolkit";
const firebaseConfig = {
  apiKey: "AIzaSyBNlu4IPziz4mIfAsmff0s9X5Ar47NCDS0",
  authDomain: "fir-54c93.firebaseapp.com",
  databaseURL: "https://fir-54c93-default-rtdb.firebaseio.com",
  projectId: "fir-54c93",
  storageBucket: "fir-54c93.appspot.com",
  messagingSenderId: "902661352357",
  appId: "1:902661352357:web:da7b62feb305464dc1964c",
  measurementId: "G-TEZHKFK098",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new FacebookAuthProvider();
const storage = getStorage(app);

export { auth, provider, storage };
