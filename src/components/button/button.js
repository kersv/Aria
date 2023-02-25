import './button.scss'

const Button = ({children}) => {
  return (
    <button className='button-container'>
      {children}
    </button>
  )
}

export default Button