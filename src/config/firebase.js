import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getStorage } from "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyDZehEbdIjKY_IbIYctBKWJmQ4-xULKAvs",
  authDomain: "blog-project-b5936.firebaseapp.com",
  projectId: "blog-project-b5936",
  storageBucket: "blog-project-b5936.appspot.com",
  messagingSenderId: "742028365921",
  appId: "1:742028365921:web:8c063ae50d28adf5091a20"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const imageDb = getStorage(app); 

export { auth, googleProvider, db, imageDb };
