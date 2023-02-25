import React from 'react'
import {Outlet} from 'react-router-dom'
import AriaLogo from '../../assets/Aria.jpg'
import './home.scss'

const Home = () => {
    return (
        <div className='home'>
            <div className='home-container'>
                <h1>Welcome to Aria</h1>
                <img src={AriaLogo} alt='Aria Logo'/>
            </div>
            <Outlet />
        </div>
    )
}

export default Home;