// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth"
import { getAuth } from "firebase/auth";

const firebaseConfig= {
  apiKey: "AIzaSyBwFPJX1UsJiW6wdE5HpqpRyokHVegjEPs",
  authDomain: "fir-react-auth-11336.firebaseapp.com",
  projectId: "fir-react-auth-11336",
  storageBucket: "fir-react-auth-11336.appspot.com",
  messagingSenderId: "327928328126",
  appId: "1:327928328126:web:f83bacce9e433d967453ef",
  measurementId: "G-DL25C5K461"
};
const app=initializeApp(firebaseConfig);
export const auth = app.auth();
export default app;