import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth, getDisplayName} from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  setCurrentUser: () => {},
  currentUser: null,
  setDisplayName: () => {},
  displayName: '',
  getName: () => {}
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [displayName, setDisplayName] = useState('');
  

  
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if(user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user)
    });
    return unsubscribe;
  }, []);
  
  const getName = async (uid) => {
    const name = await getDisplayName(uid)
    console.log(name)
    const {displayName} = (name[0].data())
    console.log(displayName)
    setDisplayName(displayName)
  }

  const value = { currentUser, setCurrentUser, displayName, setDisplayName, getName };


  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
    );
};
