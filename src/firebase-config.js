import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDVe71DJ-96sLEfQSr6EzOqt7WKjDpIjYI",
  authDomain: "employee-management-syst-6dc35.firebaseapp.com",
  projectId: "employee-management-syst-6dc35",
  storageBucket: "employee-management-syst-6dc35.appspot.com",
  messagingSenderId: "194183385848",
  appId: "1:194183385848:web:d22f517c0227cdda24e10d",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
