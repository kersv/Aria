import React from 'react'
import './room.scss'
import { UserContext } from '../../contexts/user.context'
import { useContext, useState } from 'react'
import FormInput from '../../components/form-input/form-input'
import { useNavigate } from 'react-router-dom'

import { io } from 'socket.io-client'
import { RoomKeyContext } from '../../contexts/roomkey.context'

const socket = io('http://localhost:8000')
socket.on("connect", ()=> {
    console.log("this is the socket id:", socket.id)
})

socket.on('receive-roomKey', (rk) => {
    console.log("this is the room key:", rk)
})


const defaultRoomFields = { 
    roomkey: ''
}



const Room = () => {
    const {currentUser} = useContext(UserContext)
    
    const [roomFields, setRoomFields] = useState(defaultRoomFields)
    const {roomkey} = roomFields

    const {roomKey, setRoomKey} = useContext(RoomKeyContext)

    const handleChange = (event) => {
        const {name, value} = event.target
        setRoomFields({...roomFields, [name]:value })
    }

    const resetRoomFields = () => {
        setRoomFields(defaultRoomFields)
      }

    let navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()
        
        try{
          socket.emit("room-key", roomkey)
          
          setRoomKey(roomkey)
          navigate(`/music/${roomkey}`)
          resetRoomFields()
        }
        catch(error) {
          console.log(error)
        }
    }

    const createRoom = () => {
        let result = '';
        // const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        // const charactersLength = characters.length;
        // for ( let i = 0; i < 6; i++ ) {
        //     result += characters.charAt(Math.floor(Math.random() * charactersLength));
        // }
        result = socket.id
        setRoomKey(result)

        navigate(`/music/${result}`)
        
    }

    return (
        <div className = "room-container">
            {currentUser ? 
                <div className='room'>
            
                    <div className='room-left'>
                        <button className = "create-room" onClick={createRoom}>Create Room</button>
                        <form onSubmit={handleSubmit}>
                            <FormInput className='room-input' label='Room Key' type='text' onChange={handleChange} required name='roomkey' value={roomkey}/>
                            <button className = "join-room" type='submit'>Join Room</button>
                        </form>
                    </div>
                    
                    <div className='room-right'>
                        {/* <h1>Features</h1> */}
                        <img className='img-feature' src='https://ocl-steinberg-live.steinberg.net/_storage/asset/178442/storage/PNG_large_2000px/178442-large.png' alt='Aria Features'/>
                    </div>
                    
                </div> 
                : <div className='room-signup'>Please Sign up or Login into an account</div>
            }
        </div>
    )
}

export default Room;