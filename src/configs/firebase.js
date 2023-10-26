import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBDbQkGQHdLgo_xPKGO19Mk37bglf2Z_jw",
    authDomain: "flock-ba076.firebaseapp.com",
    projectId: "flock-ba076",
    storageBucket: "flock-ba076.appspot.com",
    messagingSenderId: "881150248962",
    appId: "1:881150248962:web:7b6cc31314e62ddad0bf1b"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);