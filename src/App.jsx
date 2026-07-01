import { Suspense, useEffect, useState } from 'react'
import './App.css'
import './responsive.css'
import './index.css'
import Dashboard from './pages/Dashboard'
import Sidebar from './components/layout/Sidebar'
import { Route, Routes, Navigate } from 'react-router-dom'
import Header from './components/layout/Header'
import Projects from './pages/projects'
import Tasks from './pages/Tasks'
import { ProjectContext } from './components/context/ProjectContext'
import Kanban from './pages/Kanban'
import MySettings from './components/settings/MySettings'
import Login from './components/login/Login'
import MyProfile from './components/myProfile/EditProfile'
import ProtectedRoute from './components/protectedRoute/ProtectedRoute'

function App() {

  const [projectListData, setProjectListData] = useState([]);

  const [taskListData, setTaskListData] = useState([]);

  const [loginData, setLoginData] = useState({});

  const [darkMode, setDarkMode] = useState(false);

  const [loading, setLoading] = useState(true);

  const [sidebar,setSidebar] = useState(false);

  useEffect(() => {
    const projectData = localStorage.getItem("projectListData");
    if (projectData) {
      setProjectListData(JSON.parse(projectData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("projectListData", JSON.stringify(projectListData));
  }, [projectListData]);

   useEffect(() => {
    const mode = localStorage.getItem("darkMode");
    if (mode) {
      setDarkMode(JSON.parse(mode));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);


  useEffect(() => {

    const userInfo = localStorage.getItem("loginData");


    if (userInfo && userInfo !== "undefined") {
      const parsed = JSON.parse(userInfo);

      if (parsed) {
        setLoginData(parsed);
      }
    } 
    setLoading(false);
  }, []);
  


  useEffect(() => {
    localStorage.setItem("loginData", JSON.stringify(loginData));
  }, [loginData]);


  return (

    <ProjectContext.Provider value={{ projectListData, setProjectListData, taskListData, setTaskListData, loginData, setLoginData, darkMode, setDarkMode, loading, sidebar, setSidebar}}>
      <div className={!darkMode ? "light-mode" : "dark-mode"}>
        <Header />
        <Sidebar />
        <div className='mainSection px-10'>
          <Routes>
            
           
            <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>}></Route>
            <Route path='/projects' element={<ProtectedRoute><Projects /></ProtectedRoute>}></Route>
            <Route path='/tasks' element={<ProtectedRoute><Tasks /></ProtectedRoute>}></Route>
            <Route path='/kanban' element={<ProtectedRoute><Kanban /></ProtectedRoute>}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/editProfile' element={<ProtectedRoute><MyProfile /></ProtectedRoute>}></Route>
            <Route path='/mySettings' element={<ProtectedRoute><MySettings /></ProtectedRoute>}></Route>
          
            <Route path='*' element={<Navigate to="/login" />}></Route>

          </Routes>
        </div>
      </div>
    </ProjectContext.Provider>
  )
}

export default App
