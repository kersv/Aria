import { initializeApp } from "firebase/app";
import {getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth"
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyAmzm1vlBZY_9WuphqY6Mgp7EllYQhfjG0",
  authDomain: "aria-db-565fb.firebaseapp.com",
  projectId: "aria-db-565fb",
  storageBucket: "aria-db-565fb.appspot.com",
  messagingSenderId: "339510796659",
  appId: "1:339510796659:web:0a03e5ce236f5375a36506"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid)
  console.log(userDocRef)

  const userSnapshot = await getDoc(userDocRef)
  
  if(!userSnapshot.exists()){
    const {displayName, email} = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email, 
        createdAt
      })
    } catch(error){
      console.log('error ', error.message)
    } 
  }
  return userDocRef
}
