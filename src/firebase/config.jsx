
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyC9i1E_za-DgQgo1pSKHcxQRcPlbUFTeMo",
    authDomain: "miniblog-3f04a.firebaseapp.com",
    projectId: "miniblog-3f04a",
    storageBucket: "miniblog-3f04a.appspot.com",
    messagingSenderId: "468969549159",
    appId: "1:468969549159:web:ed9b6edf999eb93e2213c2"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export { db }