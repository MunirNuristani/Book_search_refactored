import { initializeApp } from "firebase/app"
import {getAuth} from 'firebase/auth'

const firebaseConfig = {

    apiKey: "AIzaSyC3QBGdd79-qLC66dTtQd3oDLXAPGcG9WY",
    authDomain: "book-search-project-a6797.firebaseapp.com",
    projectId: "book-search-project-a6797",
    storageBucket: "book-search-project-a6797.appspot.com",
    messagingSenderId: "392493313520",
    appId: "1:392493313520:web:e7c8c35b804d796bd14135",
    measurementId: "G-JYCGMPP4EG"
 
}

const app  = initializeApp(firebaseConfig)
export const auth = getAuth(app);
