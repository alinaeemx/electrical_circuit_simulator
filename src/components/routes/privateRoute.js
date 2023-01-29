import React from 'react'
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { AppContainer } from '../layout/appContainer';

export const PrivateRoute = ({ children }) => {
  let location = useLocation();
  const isAuth = true
  return isAuth ? children ? <AppContainer>{children}</AppContainer> : <AppContainer><Outlet /></AppContainer>
    : <Navigate to="/auth" state={{ from: location }} />;
};

