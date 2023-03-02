import React, { Fragment, useContext, useState } from 'react'
import {Link, Outlet} from "react-router-dom"
import { UserContext } from '../../contexts/user.context'
import { signOutUser } from '../../utils/firebase/firebase.utils'
import './nav.scss'
import Button from '../../components/button/button'

import profile from '../../assets/default-profile.png'

const Navigation = () => {
    const {currentUser} = useContext(UserContext)
    console.log(currentUser)

    const [state, setState] = useState(false);

    const showDropDown = () => {
        setState(true)
    }

    const hideDropDown = () => {
        setState(false)
    }

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
                            <span className = "users-name">{currentUser.displayName}</span>
                            {/* <span onClick={signOutUser} className = "signout">Signout</span> */}
                            {currentUser.photoURL ? 
                                <div className = "img-dropdown" onMouseEnter={showDropDown} onMouseLeave={hideDropDown} > 
                                    <img src={`${currentUser.photoURL}`} alt='profile-pic' className = "profile-img"/>
                                    {
                                        state ? 
                                        (<ul className = "dropdown" onMouseEnter={showDropDown}>
                                            <li className = "dropdown-menu"><span onClick={signOutUser} className = "signout">Signout</span></li>
                                        </ul>) : null
                                    }
                                </div>


                            : 
                            <div className = "img-dropdown" onMouseEnter={showDropDown} onMouseLeave={hideDropDown} > 
                                <img src={profile} alt="default profile image" className = "default-pro-pic"/>
                                    {
                                        state ? 
                                        (<ul className = "dropdown" onMouseEnter={showDropDown}>
                                            <li className = "dropdown-menu"><span onClick={signOutUser} className = "signout">Signout</span></li>
                                        </ul>) : null
                                    }
                                </div>
                            }
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