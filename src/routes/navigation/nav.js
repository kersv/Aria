import React, { Fragment } from 'react'
import {Link, Outlet} from "react-router-dom"
import AriaLogo from "../../assets/Aria.jpg"
import './nav.scss'
import Button from '../../components/button/button'

const Navigation = () => {
    return (
        <Fragment>
            <div className = "nav">
                <div className='nav-left'>
                    <Link className = "logo-container" to = "/">
                        <img className = "nav-logo" src = {AriaLogo} alt = "Aria-Logo" />
                    </Link>
                    <Link className = "nav-link" to = "/about"> About </Link>
                </div>
                <div className='nav-right'>
                    <Button>Login/Signup </Button>
                </div>
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation