import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const { authenticated } = useContext(AuthContext);

  return (
    <Route
      path={path}
      {...rest}
      render={(props) => (authenticated ? <Component {...props} /> : <Navigate to='/login' replace={true} />)}
    />
  );
};

export default PrivateRoute;
