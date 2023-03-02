import React, { Fragment, useContext } from 'react'
import {Link, Outlet} from "react-router-dom"
import { UserContext } from '../../contexts/user.context'
import { signOutUser } from '../../utils/firebase/firebase.utils'
import './nav.scss'
import Button from '../../components/button/button'



const Navigation = () => {
    const {currentUser} = useContext(UserContext)


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
                    {currentUser ? (
                        <Fragment>
                            <img src={`${currentUser.photoURL}`} alt='profile-pic'></img>
                            <span>{currentUser.displayName}</span>
                            <span onClick={signOutUser}>Signout</span>
                        </Fragment>
                    ) : (
                        <Link className='login-signup-nav' to='/auth'>
                            <Button>Login/Signup </Button>
                        </Link>

                    )}
                </div>
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation