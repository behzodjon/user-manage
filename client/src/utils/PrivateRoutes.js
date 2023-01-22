import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import React, { useContext } from 'react';

const PrivateRoutes = () => {
  const { authenticated } = useContext(AuthContext);

  return authenticated ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoutes;
