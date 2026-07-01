import React, { useContext, useState } from 'react'
import { ProjectContext } from '../context/ProjectContext';

const MySettings = () => {

  const { darkMode, setDarkMode, projectListData, setProjectListData, loginData, setLoginData, taskListData, setTaskListData } = useContext(ProjectContext);

  const [alerts, setAlerts] = useState(false);

  const resetData = (e) => {

    localStorage.removeItem("projectListData");
    localStorage.removeItem("taskListData");
    localStorage.removeItem("darkMode");

    setProjectListData([]);
    setTaskListData([]); // if stored in Context
    setDarkMode(false);

    setAlerts(true);

    setTimeout(() => {
      setAlerts(false);
    }, 2000);

  }


  return (
    <div className='myProfile-section mySettings-section'>
      <div className="mainLogin">
        <h4 className='text-center pb-2'>My Settings</h4>
        <div className='loginBox'>

          {alerts ? <span className="d-block mb-3 p-1 badge bg-success">Data reset successfully</span> : null}
          <div className="form-check  form-switch ps-0">
            <ul className='d-flex items-center modeSwitch ps-0'>
              <label>light/Dark Mode : </label>
              <p>☀️</p>
              <input onClick={() => setDarkMode(!darkMode)} className="form-check-input" type="checkbox" id="darkModeToggle" checked={darkMode} />
              <p>🌙</p>
            </ul>

            <label>Click Here to Reset Your Data : </label>
            <button className='btn btn-primary ms-2' onClick={resetData} >Reset</button>
          </div>


        </div>
      </div>
    </div>
  )
}

export default MySettings
