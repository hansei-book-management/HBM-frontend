import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useFetchUser, useGetClub } from '@/hooks';

export interface PrivateRouteProps {
  needAuth?: boolean;
  adminPage?: boolean;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  adminPage = false,
  needAuth = false,
}) => {
  const { data: club } = useGetClub();
  const { data: user } = useFetchUser();

  const isAuthenticatedUser = user?.result.role === 'user';
  const isAdmin = user?.result?.role === 'admin';
  const isDirector = club?.result.director === user?.result.uid;

  if (needAuth) {
    return isAuthenticatedUser && isDirector ? <Outlet /> : <Navigate to="/auth/login" />;
  } else if (needAuth && adminPage) {
    return isAuthenticatedUser && isAdmin ? <Outlet /> : <Navigate to="/auth/login" />;
  } else {
    return isAuthenticatedUser ? <Navigate to="/" /> : <Outlet />;
  }
};
