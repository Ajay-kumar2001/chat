import { initializeApp } from "firebase/app";
import {getMessaging} from  "firebase/messaging"
const firebaseConfig = {
  apiKey: "AIzaSyCnfosk-VJyHUCajMFmWAF9lkYYJ6nTTbc",
  authDomain: "thapala-01.firebaseapp.com",
  projectId: "thapala-01",
  storageBucket: "thapala-01.appspot.com",
  messagingSenderId: "396233703044",
  appId: "1:396233703044:web:9944638ee43406d692ccd1",
  measurementId: "G-EC1YZKKM9K"
};
 export const app = initializeApp(firebaseConfig);
 export  const messaging=getMessaging(app)