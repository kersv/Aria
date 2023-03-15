import { useRef, useContext, useState, useEffect, Fragment} from 'react'
import { RoomKeyContext } from '../../contexts/roomkey.context'
import { UserContext } from '../../contexts/user.context'
import FormInput from '../../components/form-input/form-input'
import Youtube from 'react-youtube'
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
  const [ytPlayer, setYtPlayer] = useState('')
  const [videoTitle, setVideoTitle] = useState('')
  const [videoQueue, setVideoQueue] = useState([])
  const [titleQueue, setTitleQueue] = useState([])
  const {message} = messageFields
  const [chatroom, setChatRoom] = useState([])
  // const [userroom, setUserRoom] = useState([])
  const {roomKey, setRoomKey} = useContext(RoomKeyContext)
  const {currentUser, getName, displayName} = useContext(UserContext)

  // this reference is for when the user types a new message and the chatbox is full, itll automatically show you the bottom
  const chatRef = useRef(null)
  const playerRef = useRef(null)

  const opts = {
    width: '100%',
    height: '100%', 
    playerVars: {
      autoplay: 1,
    }
  }

  socket.on('recieve-video-status', (incomingStatus) => {
    if(playerRef.current !== null && playerRef.current.getIframe() &&playerRef.current.getIframe().src){
      if(incomingStatus === true){
        playerRef.current.playVideo();
      }
      else{
        playerRef.current.pauseVideo();
      }
    }
  })

  socket.on('recieve-message', async(inComingMessage, inComingName) => {
    await setChatRoom([...chatroom,  [inComingMessage, inComingName]])
    await console.log("this is the chatroom", chatroom)
  })

  socket.on('recieve-yt', (incomingYT) => {
    // setYtPlayer(incomingYT)
    setVideoQueue([...videoQueue, incomingYT])
    returnTitle(incomingYT)
  })

  useEffect(() => {  
    setYtPlayer(videoQueue[0])
    getTitle(videoQueue[0])    
  }, [videoQueue[0]])

  const getTitle = async(id) => {
    try{
      const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${id}&part=snippet&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
      const data = await response.json()
      const title = data.items[0].snippet.title;
      console.log(title)
      setVideoTitle(title)
    }
    catch(error){
      console.log(error)
    }
  }

  const returnTitle = async(id) => {
    try{
      const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${id}&part=snippet&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
      const data = await response.json()
      const title = data.items[0].snippet.title;
      setTitleQueue([...titleQueue, title])
      console.log('THIS IS THE RETURN TITLE', title)
    }
    catch(error){
      console.log(error)
    }
  }

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
    setRoomKey(roomCode)
  }, [setRoomKey])

  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [chatroom])


  const resetMessageFields = () => {
    setMessageFields(defaultMessageFields)
  }
  const resetYtFields = () => {
    setYtFields(defaultYTFields)
    
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

  const ytSubmit = async(event) => {
    event.preventDefault()
    // console.log(yt_link)
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    const match = yt_link.match(regExp);
    const id = match && match[7].length == 11 ? match[7] : null 

    await setVideoQueue([...videoQueue, id])
    returnTitle(id)
    // await setYtPlayer(videoQueue[0])
    socket.emit('send-yt-link', id, roomKey)
    resetYtFields()
  }



  const onReady = (event) => { 
    console.log('LOADED')
    playerRef.current = event.target
  }
  const onPlay = (event) => {
    console.log('PLAY')
    const msg = true
    playerRef.current.playVideo()
    socket.emit('send-video-status', msg, roomKey)
  }
  const onPause = (event) => {
    console.log('PAUSED')
    const msg = false
    playerRef.current.pauseVideo()
    socket.emit('send-video-status', msg, roomKey)
  }
  const onEnd = (event) => {
    console.log('ended')
    setVideoQueue(prevQueue => prevQueue.slice(1))
    setTitleQueue(prevTitle => prevTitle.slice(1))
  }
  

  return (
    <div className='music-room-container'>
      <div className='room-key'>Room Key: {roomKey}</div>
      <div className='content-wrapper'>

        <div className='music-queue'>
          
          {
            titleQueue.map((title, index) => (
              <div key={index} className='video-title'> {title} </div>
            ))
          }
          
        </div>

        <div className='video-player'>
          {ytPlayer !== ''}{
            <Fragment>
              <span className='video-title'>{videoTitle}</span>
              <Youtube videoId={ytPlayer} opts={opts} onReady={onReady} onPlay={onPlay} onPause={onPause} onEnd={onEnd} style={{width: '90%', height:'80%'}}/>
            </Fragment>
          }
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
              <button type='submit' className='send-button'>Chat</button>
            </form>
        </div>

      </div>
      <div className='input-link-container'>
        <form onSubmit={ytSubmit} className='yt-input-form'>
          <FormInput label='Youtube Link' type='text' className='yt-input' required onChange={ytChange} name='yt_link' value={yt_link}/>
          <button type='submit' className='send-yt-button'>Send Link</button>
        </form>
      </div>

    </div>
  )
}

export default MusicRoom