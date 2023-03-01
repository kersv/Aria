import './auth.scss'
import Button from '../../components/button/button'
import { createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
import SignUpForm from '../../components/sign-up/sign-up'
import SignInForm from '../../components/sign-in/sign-in'


const Auth = () => {


  

  return (
    <div className='auth-container'>
        <SignInForm/>
        <SignUpForm/>
      
    </div>
  )
}

export default Auth
