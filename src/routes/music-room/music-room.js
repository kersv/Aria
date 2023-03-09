import { useRef, useContext, useState, useEffect} from 'react'
import { RoomKeyContext } from '../../contexts/roomkey.context'
import { UserContext } from '../../contexts/user.context'
import './music-room.scss'
import { io } from 'socket.io-client'


const socket = io('http://localhost:8000')


const defaultMessageFields = {
  message: '',
}
const defaultYTFields = {
  yt_link: '',
}

const MusicRoom = () => {
  const [messageFields, setMessageFields] = useState(defaultMessageFields)
  const [ytFields, setYtFields] = useState(defaultYTFields)
  const {yt_link} = ytFields
  const {message} = messageFields
  const [chatroom, setChatRoom] = useState([])
  // const [userroom, setUserRoom] = useState([])
  const {roomKey, setRoomKey} = useContext(RoomKeyContext)
  const {currentUser, getName, displayName} = useContext(UserContext)

  // this reference is for when the user types a new message and the chatbox is full, itll automatically show you the bottom
  const chatRef = useRef(null)

  socket.on('recieve-message', async(inComingMessage, inComingName) => {
    await setChatRoom([...chatroom,  [inComingMessage, inComingName]])
    await console.log("this is the chatroom", chatroom)
  })

  useEffect(() => {
    if(currentUser){
        getName(currentUser.uid)
    }
  }, [currentUser, getName])  
  
  useEffect(() => {
    socket.emit('join-room', roomKey)
  }, [roomKey])
  
  useEffect(() => {
    const currentURL = window.location.pathname
    const parts = currentURL.split('/')
    const roomCode = parts[parts.length-1]
    console.log(roomCode)
    setRoomKey(roomCode)
  }, [setRoomKey])

  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [chatroom])


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
      await setChatRoom([...chatroom,  [newMessage, displayName]])
      socket.emit('send-message', newMessage, roomKey, displayName)
      
      resetMessageFields()
    }
    catch(error){
      console.log(error.code)
    }
  }

  const ytChange = (event) => {
    const {name, value} = event.target
    setYtFields({[name]: value})
  }

  const ytSubmit = (event) => {
    event.preventDefault()
    console.log(yt_link)
  }

  return (
    <div className='music-room-container'>
      <div className='room-key'>Room Key: {roomKey}</div>
      <div className='content-wrapper'>
        <div className='music-queue'>MUSIC QUEUE</div>
        <div className='video-player'>VIDEO PLAYER
        <iframe></iframe>       
        </div>
        <div className='message-container'>
          <div className='chatroom'>Chat Room</div>
          <div className='chatroom-container' ref={chatRef}>{chatroom.map((item, index) => (
            <div key={index} className = "user-info-message">
              <span className = "user">{item[1]}: </span>
              <span className = "user-message">{item[0]}</span>
            </div>
          ))}</div>
            <form onSubmit={handleSubmit} className='message-form'>
              <input type='text' className='message-input' required onChange={handleChange} name='message' value={message}/>
              <button type='submit' className='send-button'>Send</button>
            </form>
        </div>

      </div>
          <div>
            <form onSubmit={ytSubmit} className='message-form'>
              <input type='text' className='yt-input' required onChange={ytChange} name='yt_link' value={yt_link}/>
              <button type='submit' className='send-button'>Send</button>
            </form>
          </div>

    </div>
  )
}

export default MusicRoom