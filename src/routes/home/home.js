import React from 'react'
import { Outlet } from 'react-router-dom'
import AriaLogo from '../../assets/Aria.jpg'
import './home.scss'
import Logo from '../../components/logo/logo.js'

const Home = () => {
    return (
        <div className='home'>
            
            <div className='home-container'>
                <h1>Welcome to</h1>
                <Logo />
                {/* <img src={AriaLogo} alt='Aria Logo'/> */}
            </div>
            <Outlet/>
        </div>
    )
}

export default Home;