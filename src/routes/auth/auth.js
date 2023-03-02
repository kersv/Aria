import './auth.scss'
import Button from '../../components/button/button'
import { createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
import SignUpForm from '../../components/sign-up/sign-up'
import SignInForm from '../../components/sign-in/sign-in'
import { UserContext } from '../../contexts/user.context'
import { useContext } from 'react'
import { useNavigate } from "react-router-dom";


const Auth = () => {
  const {currentUser} = useContext(UserContext)

  let navigate = useNavigate();
  // console.log(currentUser)
  if(currentUser){
    navigate('/')
  }
  
  return (
    <div className='auth-container'>
        <SignInForm/>
        <SignUpForm/> 
    </div>
  )
  
}


export default Auth
