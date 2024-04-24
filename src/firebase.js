import { initializeApp } from "firebase/app";
import {getMessaging} from  "firebase/messaging"
const firebaseConfig = {
  apiKey: "AIzaSyBQQ8MsKiVWOc4UjxLSvyNW-qPnEdOT9pI",
  authDomain: "ajay-project-3d722.firebaseapp.com",
  projectId: "ajay-project-3d722",
  storageBucket: "ajay-project-3d722.appspot.com",
  messagingSenderId: "172938665806",
  appId: "1:172938665806:web:b33adc1091f20daaae081f",
  measurementId: "G-BV0DDRQ4NS"
};
 export const app = initializeApp(firebaseConfig);
 export  const messaging=getMessaging(app)