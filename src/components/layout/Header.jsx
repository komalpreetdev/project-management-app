import React, { useContext, useState } from 'react'
import { Nav } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaBell } from 'react-icons/fa'
import userImg from '../../assets/user.png'
import { FaAngleDown, FaBars } from 'react-icons/fa6'
import { ProjectContext } from '../context/ProjectContext'

const Header = () => {

    const navigate = useNavigate();

    const { loginData, setSidebar } = useContext(ProjectContext);
    
    const last = loginData;

    const logout = () => {
        localStorage.removeItem("loginData");
        navigate("/login");
    }

    return (

        <Nav className='header pb-4 pt-1'>
            <ul className='  headerUl flex items-center mb-0 justify-content-between  w-100 '>
                <li className='ps-2 flex items-center gap-3'><div className='bars' onClick={() => setSidebar(true)}><FaBars /></div><h4 className='mb-0'>Dashboard</h4></li>
                <li>
                    <ul className='flex items-center'>

                        <li className='flex items-center gap-2 cursor-pointer'>
                            <div className="dropdown">
                                <button className="dropbtn flex items-center gap-2">
                                    {
                                        last ?

                                            <img src={last.userImgs ? last.userImgs : userImg} className='profileImg' />

                                            :
                                            <img src={userImg} className='profileImg' />

                                    }

                                    <FaAngleDown />
                                </button>

                                <div className="dropdown-content">
                                    <NavLink to="/editProfile">Profile</NavLink>
                                    <NavLink to="/" onClick={logout}>Logout</NavLink>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </Nav>

    )
}

export default Header
