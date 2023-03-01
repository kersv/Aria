import './sign-in.scss'
import { useState } from 'react'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword} from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input'


const defaultFormFields = { 
  email: '',
  password: '',
  
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const {email, password} = formFields

  const signInWithGoogle = async () => {
    const {user} = await signInWithGooglePopup();

    createUserDocumentFromAuth(user)
  }

  const handleChange = (event) => {
    const {name, value} = event.target
    setFormFields({...formFields, [name]:value })
  }

  const resetFormFiels = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    try{
      const response = await signInAuthUserWithEmailAndPassword(email, password)
      console.log(response)
      resetFormFiels()
    }
    catch(error) {
      switch(error.code){
        case 'auth/wrong-password':
          alert('Invalid password')
          break
        case 'auth/user-not-found':
          alert('Invaild user')
          break
        default:
          console.log(error)
        }

      
    }
  }
 
  
  return(
    <div className='sign-in-container'>
      <h2>Already have an account?</h2>
      <span>Sign In with your email and password</span>
      <form onSubmit={handleSubmit}>
        
        <FormInput label='Email' type='email' onChange={handleChange} required name='email' value={email}/>

  
        <FormInput label='Password' type='password' onChange={handleChange} required name='password' value={password}/>
        <div className='buttons-container'> 
          <button className='sign-in' type='submit'>Sign In</button>
          <button className='google-sign-in' onClick={signInWithGoogle}>Google Sign In</button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm