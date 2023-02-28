import React from 'react'
import './home.scss'
import Logo from '../../components/logo/logo.js'

const Home = () => {
    return (
        <div className='home'>
            
            <div className='home-container-left'>
                <h1>Welcome to</h1>
                <Logo />
                {/* <img src={AriaLogo} alt='Aria Logo'/> */}
            </div>
            
            <div className='home-container-right'>
                {/* <h1>Features</h1> */}
                <img className='img-feature' src='https://ocl-steinberg-live.steinberg.net/_storage/asset/178442/storage/PNG_large_2000px/178442-large.png' alt='Aria Features'/>
            </div>
            
        </div>
    )
}

export default Home;