
// const firebaseConfig = {
//   apiKey: "AIzaSyDatqmv3vBjR_L8430CESBFYwzbJ2F3xjw",
//   authDomain: "attendancesystem-21f7d.firebaseapp.com",
//   projectId: "attendancesystem-21f7d",
//   storageBucket: "attendancesystem-21f7d.firebasestorage.app",
//   messagingSenderId: "449386350771",
//   appId: "1:449386350771:web:54865946269c5a508388c6"
// };
// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDatqmv3vBjR_L8430CESBFYwzbJ2F3xjw",
   authDomain: "attendancesystem-21f7d.firebaseapp.com",
   projectId: "attendancesystem-21f7d",
   storageBucket: "attendancesystem-21f7d.firebasestorage.app",
   messagingSenderId: "449386350771",
   appId: "1:449386350771:web:54865946269c5a508388c6"
  
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

