import { useContext, useState} from 'react'
import { RoomKeyContext } from '../../contexts/roomkey.context'
import './music-room.scss'


const defaultMessageFields = {
  message: '',
}

const MusicRoom = () => {
  const [messageFields, setMessageFields] = useState(defaultMessageFields)
  const {message} = messageFields
  const [chatroom, setChatRoom] = useState([])
  const {roomKey} = useContext(RoomKeyContext)

  

  const resetMessageFields = () => {
    setMessageFields(defaultMessageFields)
  }

  const handleChange = (event) => {
    const {name, value} = event.target
    setMessageFields({[name]: value})
    // console.log(value)
    // console.log(name)
  }


  const handleSubmit = async (event) => {
    event.preventDefault()
    const newMessage = message
    try{
      await setChatRoom([...chatroom, newMessage])
      resetMessageFields()
    }
    catch(error){
      console.log(error.code)
    }
  }

  console.log(roomKey)
  
  return (
    <div className='message-container'>
      <div className='chatroom-container'>{chatroom.map((item, index) => (<div key={index}>{item}</div>))}</div>
      <form onSubmit={handleSubmit} className='message-form'>
        <label>Message</label>
        <input type='text' className='message-input' required onChange={handleChange} name='message' value={message}/>
        <button type='submit' className='send-button'>Send</button>
      </form>
    </div>
  )
}

export default MusicRoom