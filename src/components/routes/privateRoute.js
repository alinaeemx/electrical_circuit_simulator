import React from 'react'
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { AppContainer } from '../layout/appContainer';
// import { AuthenticationStore } from '../../store/AuthenticationStore';
 

// const useAuth = () => {
//   const { user } = AuthenticationStore(); 
//   return user && user.success;
// };
export const PrivateRoute = ({ children }) => {
  let location = useLocation();
  const isAuth = true//useAuth();
  return isAuth ? children ? <AppContainer>{children}</AppContainer> : <AppContainer><Outlet /></AppContainer>
    : <Navigate to="/auth" state={{ from: location }} />;
};

