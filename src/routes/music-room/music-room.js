import { useContext, useState, useEffect} from 'react'
import { RoomKeyContext } from '../../contexts/roomkey.context'
import { UserContext } from '../../contexts/user.context'
import './music-room.scss'
import { io } from 'socket.io-client'



const socket = io('http://localhost:8000')
socket.on('recieve-message', (Newmessage, name) => {
  console.log('message = ', Newmessage , name )
})


const defaultMessageFields = {
  message: '',
  
}

const MusicRoom = () => {
  const [messageFields, setMessageFields] = useState(defaultMessageFields)
  const {message} = messageFields
  const [chatroom, setChatRoom] = useState([])
  const {roomKey} = useContext(RoomKeyContext)
  const {currentUser, getName, displayName} = useContext(UserContext)

  useEffect(() => {
    if(currentUser){
        getName(currentUser.uid)
    }
  }, [currentUser, getName])  
  
  useEffect(() => {
    socket.emit('join-room', roomKey)
  }, [roomKey])


  const resetMessageFields = () => {
    setMessageFields(defaultMessageFields)
  }

  const handleChange = (event) => {
    const {name, value} = event.target
    setMessageFields({[name]: value})

  }


  const handleSubmit = async (event) => {
    event.preventDefault()
    const newMessage = message
    try{
      await setChatRoom([...chatroom,  [newMessage]])
      socket.emit('send-message', newMessage, roomKey, displayName)
      
      resetMessageFields()
    }
    catch(error){
      console.log(error.code)
    }
  }

  

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