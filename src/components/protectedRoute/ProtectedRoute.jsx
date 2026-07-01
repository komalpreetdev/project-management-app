import React, { useContext } from 'react'
import { ProjectContext } from '../context/ProjectContext'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { loginData, loading } = useContext(ProjectContext);

  if (loading) {
    return null; 
  }

  if (!loginData.userName) {
    return <Navigate to="/login" replace />
  }
  return children;

}

export default ProtectedRoute
