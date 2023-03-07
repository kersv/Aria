import './sign-up.scss'
import { useState } from 'react'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input'


const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const {displayName, email, password, confirmPassword} = formFields

  const handleChange = (event) => {
    const {name, value} = event.target
    setFormFields({...formFields, [name]:value })
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if(password !== confirmPassword){
      alert('password do not match')
      return
    }
    try{
  
      const {user} = await createAuthUserWithEmailAndPassword(email, password)
      await createUserDocumentFromAuth(user, {displayName})
      resetFormFields()
    }
    catch(error) {
      if(error.code === 'auth/email-already-in-use'){
        alert('cannot create user, email already in use')
      }
      else{
        console.log('error' , error.message)
      }
    }
  }
 
  
  return(
    <div className='sign-up-container'>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        
        <FormInput label='Display Name' type='text' onChange={handleChange} required name='displayName' value={displayName}/>
       
        
        <FormInput label='Email' type='email' onChange={handleChange} required name='email' value={email}/>

        
        <FormInput label='Password' type='password' onChange={handleChange} required name='password' value={password}/>

        
        <FormInput label='Confirm Password' type='password' onChange={handleChange} required name='confirmPassword' value={confirmPassword}/>
        
        <button className='sign-up' type='submit'>Sign Up</button>
      </form>
    </div>
  )
}

export default SignUpForm