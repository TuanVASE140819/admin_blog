import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDU73cFks2koiIbC2rQWli3JeW9HFT92F8",
  authDomain: "weloveschool-c9c4d.firebaseapp.com",
  projectId: "weloveschool-c9c4d",
  storageBucket: "weloveschool-c9c4d.appspot.com",
  messagingSenderId: "227721759570",
  appId: "1:227721759570:web:ebd13408144bdb9ba7c88b",
  measurementId: "G-KDBZFM21NP",
};

const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);
