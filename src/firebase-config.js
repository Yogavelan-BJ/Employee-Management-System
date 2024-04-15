import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyD54q9_6KVqkNptiNF236zblLBY828loBU",
  authDomain: "employee-management-syst-9e7bc.firebaseapp.com",
  projectId: "employee-management-syst-9e7bc",
  storageBucket: "employee-management-syst-9e7bc.appspot.com",
  messagingSenderId: "439388826474",
  appId: "1:439388826474:web:ec75ce387d825241e7d313",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
