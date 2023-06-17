import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useFetchUser } from '@/hooks';

export interface PrivateRouteProps {
  needAuth?: boolean;
  adminPage?: boolean;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  adminPage = false,
  needAuth = false,
}) => {
  const { data: user } = useFetchUser();

  const isAuthenticatedUser = user?.userInfo?.result.role === 'user';
  const isAdmin = user?.userInfo?.result.role === 'admin';
  const isDirector = user?.userInfo?.result.role === 'director';

  if (needAuth) {
    return isDirector ? <Outlet /> : <Navigate to="/auth/login" />;
  } else if (needAuth && adminPage) {
    return isAdmin ? <Outlet /> : <Navigate to="/auth/login" />;
  } else {
    return isAuthenticatedUser ? <Navigate to="/" /> : <Outlet />;
  }
};
