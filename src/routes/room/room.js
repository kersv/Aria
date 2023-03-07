import React from 'react'
import './room.scss'
import { UserContext } from '../../contexts/user.context'
import { useContext, useState } from 'react'
import FormInput from '../../components/form-input/form-input'

import { io } from 'socket.io-client'

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

    const handleChange = (event) => {
        const {name, value} = event.target
        setRoomFields({...roomFields, [name]:value })
    }

    const resetRoomFields = () => {
        setRoomFields(defaultRoomFields)
      }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try{
          socket.emit("room-key", roomkey)
          resetRoomFields()
        }
        catch(error) {
          console.log(error)
        }
    }

    return (
        <div className = "room-container">
            {currentUser ? 
                <div className='room'>
            
                    <div className='room-left'>
                        <button className = "create-room" onClick={() => console.log("this is the socket id:", socket.id)}>Create Room</button>
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