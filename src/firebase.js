// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseconfig = {
    apiKey: "AIzaSyA_3GcDAYyyIpJ1JGMh2c4RFrpQ0Fzf_mw",
    authDomain: "instagram-clone-7121d.firebaseapp.com",
    projectId: "instagram-clone-7121d",
    storageBucket: "instagram-clone-7121d.appspot.com",
    messagingSenderId: "821543881444",
    appId: "1:821543881444:web:ecf252dd6590156bdf7af1",
    measurementId: "G-TPEBK8V3YP"
  };

  const app = initializeApp(firebaseconfig);

  const db = getFirestore(app);

  export { db };