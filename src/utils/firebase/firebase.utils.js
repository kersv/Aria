import { initializeApp } from "firebase/app";
import {getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from "firebase/auth"
import {getFirestore, doc, getDoc, setDoc, collection, query, getDocs} from 'firebase/firestore'


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

export const createUserDocumentFromAuth = async (userAuth, additionalInfo) => {
  const userDocRef = doc(db, 'users', userAuth.uid)

  const userSnapshot = await getDoc(userDocRef)

  if(!userSnapshot.exists()){
    const {displayName, email} = userAuth
    const createdAt = new Date()
    try {
      await setDoc(userDocRef, {
        displayName,
        email, 
        createdAt,
        ...additionalInfo
      })
    } catch(error){
      console.log("error creating the user", error.message);
    } 
  }
  return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return

  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return

  return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);


// retrieving data from firestore
export const getDisplayName = async (uid) => {
  console.log(uid)
  const collectionRef = collection(db, 'users')
  const q = query(collectionRef)
  
  const querySnapshot = await getDocs(q)
  
  // console.log(querySnapshot.docs[0].id)
  // console.log(querySnapshot.docs[1].id)
  // console.log(querySnapshot.docs[2].id)
  const userMap = querySnapshot.docs.filter( (docSnapshot) => docSnapshot.id === uid)
  // const userMap = querySnapshot.docs.filter((docSnapshot) => {
    
  //   // console.log(docSnapshot.data())
  //   // console.log(docSnapshot.id)
  //   if(uid === docSnapshot.id){
  //     console.log(docSnapshot)
  //     const {displayName} = docSnapshot.data()
  //     console.log(displayName)
  //     return displayName
  //   }
  // })
  console.log(userMap)

  return userMap
}