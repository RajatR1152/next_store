import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyC2JO-cS_X71GDu2Qk-6znuKuCcwww1LGg",
    authDomain: "clone-de40f.firebaseapp.com",
    projectId: "clone-de40f",
    storageBucket: "clone-de40f.appspot.com",
    messagingSenderId: "662810976825",
    appId: "1:662810976825:web:d1363d394e8e6516be63e8",
    measurementId: "G-Z129ZTQZH3"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);