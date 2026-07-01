import React, { useContext, useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import userImg from '../../assets/user.png'
import { ProjectContext } from '../context/ProjectContext';
import { useNavigate } from 'react-router-dom';
const Login = () => {

  const navigate = useNavigate();


  const [userImgs, setUserImgs] = useState();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const { loginData, setLoginData } = useContext(ProjectContext);


  const profileHandler = (e) => {

    e.preventDefault();
    setLoginData({ userImgs, userName, userEmail });
    navigate("/dashboard");


  }


  const imgUploadHandler = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setUserImgs(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };


  return (
    <>
      <style>{`
        .dark-mode {
          padding: 0 !important;
        }

        .header {
          display: none;
        }

        .sidebar {
          display: none;
        }
          .mainSection{
          margin-left:0;
          padding:0;
          }
      `}
      </style>
      <div className='myProfile-section pt-15'>
        <div className='mainLogin'>
          <h4 className='text-center'>Login</h4>
          <div className='loginBox'>

            <form onSubmit={profileHandler}>
              <div className='userImg text-center'>
                <label>
                  <input onChange={imgUploadHandler} type='file' accept='image/*' required />
                  <FaEdit className='editImg' />
                </label>
                <img src={userImgs || userImg}></img>

              </div><br />

              <label className='pb-2'>Name :</label><br />
              <input value={userName} onChange={(event) => setUserName(event.target.value)} className='w-100 border rounded p-1' type='text' placeholder='enter name' required /><br /><br />

              <label className='pb-2'>Email :</label><br />
              <input value={userEmail} onChange={(event) => setUserEmail(event.target.value)} className=' w-100 border rounded p-1' type='text' placeholder='enter your email' required /><br /><br />

              <div className='text-center'>
                <button className=' bg-default rounded border p-2'>Submit</button>
              </div>


            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
