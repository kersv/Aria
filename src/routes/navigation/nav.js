import React, { Fragment } from 'react'
import {Link, Outlet} from "react-router-dom"
import './nav.scss'
import Button from '../../components/button/button'



const Navigation = () => {
    
    return (
        <Fragment>
            <div className = "nav">
                <div className='nav-left'>
                    <Link className = "logo-container-nav" to = "/">
                        <div className = "logo-nav">
                            <div className = "line-nav"></div>
                            <div className = "x-nav">X</div>
                            <div className = "line-nav"></div>
                        </div>
                        <div className = "logo-bottom-nav">Aria</div>
                    </Link>
                    <Link className = "nav-link" to = "/about"> About </Link>
                </div>
                <div className='nav-right'>
                    <Link className='login-signup-nav' to='/auth'>
                        <Button>Login/Signup </Button>
                    </Link>
                </div>
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation