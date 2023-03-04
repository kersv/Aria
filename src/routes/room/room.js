import React from 'react'
import './room.scss'
import { UserContext } from '../../contexts/user.context'
import { useContext } from 'react'



const Room = () => {
    const {currentUser} = useContext(UserContext)

    return (
        <div className = "room-container">
            {currentUser ? 
                <div className='room'>
            
                    <div className='room-left'>
                        <button className = "create-room">Create Room</button>
                        <input />
                        <button className = "join-room">Join Room</button>
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