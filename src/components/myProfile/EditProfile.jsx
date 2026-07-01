import React, { useContext, useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { ProjectContext } from '../context/ProjectContext'

const EditProfile = () => {
  const { loginData, setLoginData } = useContext(ProjectContext);

  const [editUserImgs, setEditUserImgs] = useState();
  const [editUserName, setEditUserName] = useState('');
  const [editUserEmail, setEditUserEmail] = useState('');
  const [alerts, setAlerts] = useState(false);

  useEffect(() => {
    if (loginData) {
      setEditUserImgs(loginData.userImgs || "");
      setEditUserName(loginData.userName || "");
      setEditUserEmail(loginData.userEmail || "");
    }
  }, [loginData]);

  const imageHandler = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setEditUserImgs(reader.result);
      }
      reader.readAsDataURL(file);
    }
  }


  const editProfileHandler = (e) => {
    e.preventDefault();
    setLoginData({
      userImgs: editUserImgs,
      userName: editUserName,
      userEmail: editUserEmail
    });

    setAlerts(true);

    setTimeout(() => {
      setAlerts(false);
    }, 2000);

  }


  return (
    <div className='myProfile-section editProfile pt-1'>
      <div class="mainLogin">
        <h4 className='text-center pb-2'>Edit Profile</h4>
        <div className='loginBox'>
          
          <form onSubmit={editProfileHandler}>

            {alerts ? <span className="d-block mb-3 p-1 badge bg-success">Data Updated successfully</span> : null}

            <div className='userImg text-center'>
              <label>
                <input onChange={imageHandler} type='file' accept='image/*' required />
                <FaEdit className='editImg' />
              </label>
              <img src={editUserImgs}></img>

            </div>
            <br />

            <label className='pb-2'>Name :</label><br />
            <input onChange={(event) => setEditUserName(event.target.value)} defaultValue={loginData.userName} className='w-100 border rounded p-1' type='text' placeholder='enter name' required /><br /><br />

            <label className='pb-2'>Email :</label><br />
            <input onChange={(event) => setEditUserEmail(event.target.value)} defaultValue={loginData.userEmail} className=' w-100 border rounded p-1' type='text' placeholder='enter name' required /><br /><br />

            <div className='text-center'>
              <button className=' bg-default rounded border p-2'>Submit</button>
            </div>


          </form>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
