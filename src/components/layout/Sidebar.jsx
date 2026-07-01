import React, { useContext } from 'react'
import logo from '../../assets/react.png'
import { Nav } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import { FaChartArea, FaGear, FaHammer, FaList, FaMeteor, FaPen, FaRProject, FaSliders } from 'react-icons/fa6'
import { FaTasks, FaTimes } from 'react-icons/fa'
import { ProjectContext } from '../context/ProjectContext'

const Sidebar = () => {
    const{sidebar,setSidebar} = useContext(ProjectContext);
    return (
        <div  className={`sidebar ${sidebar ? "sidebar-open" : "sidebar-close"}`}>
            <div className='times' onClick={()=>setSidebar(false)}><FaTimes/></div>
            <ul className='p-2 Navbar'>

                <div className='logo flex  items-center border-bottom boder-primary pb-3'>
                    <img src={logo} />
                    <p className='pl-2 mb-0'>Project Management App</p>
                </div>

                <div className='navLinks py-10'>
                    <Nav>

                        <ul className='ps-0 w-100'>
                            <li><NavLink to="/dashboard" className={({isActive}) => isActive ? "navActive" : ''}><FaMeteor/> Dashboard</NavLink></li>
                            <li><NavLink to="/projects" className={({isActive}) => isActive ? "navActive" : ''}><FaPen/> Projects</NavLink></li>
                            <li><NavLink to="/tasks" className={({isActive}) => isActive ? "navActive" : ''}><FaTasks/> Tasks</NavLink></li>
                            <li><NavLink to="/kanban" className={({isActive}) => isActive ? "navActive" : ''}><FaSliders/> Kanban</NavLink></li>
                            <li><NavLink to="/mySettings" className={({isActive}) => isActive ? "navActive" : ''}><FaGear/> Settings</NavLink></li>
                        </ul>    
                        
                    </Nav>

                </div>
            </ul>
        </div>
    )
}

export default Sidebar
