import React from 'react'
import AriaLogo from '../../assets/Aria.jpg'
import './home.scss'

const Home = () => {
    return (
        <div className='home'>
            
            <div className='home-container'>
                <h1>Welcome to Aria</h1>
                <img src={AriaLogo} alt='Aria Logo'/>
            </div>
            
            <div className='home-container'>
                {/* <h1>Features</h1> */}
                <img className='img-feature' src='https://ocl-steinberg-live.steinberg.net/_storage/asset/178442/storage/PNG_large_2000px/178442-large.png' alt='Aria Features'/>
            </div>
            
        </div>
    )
}

export default Home;