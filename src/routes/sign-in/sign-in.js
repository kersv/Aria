import './sign-in.scss'
import { signInWithGooglePopup } from '../../utils/firebase/firebase.utils'
import Button from '../../components/button/button'
import { createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'

const SignIn = () => {

  const signInWithGoogle = async () => {
    const {user} = await signInWithGooglePopup();
   
    createUserDocumentFromAuth(user)
  }

  return (
    <div className='sign-in'>
      <button onClick={signInWithGoogle}>Sign in with google</button>
    </div>
  )
}

export default SignIn
