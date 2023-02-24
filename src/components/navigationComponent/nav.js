import React from 'react'
import {Link, Outlet} from "react-router-dom"
import AriaLogo from "../../assets/Aria.jpg"
import './nav.scss'

const Navigation = () => {
    return (
        <div className = "nav">
            <div>This is the nav</div>
            <Link className = "logo-container" to = "/">
                <img className = "nav-logo" src = {AriaLogo} alt = "Aria-Logo" />
            </Link>
            
            <Link className = "nav-link" to = "/about"> About </Link>
            <Outlet />
        </div>
    )
}

export default Navigation