import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useFetchUser } from '@/hooks';
import { NotFoundPage } from '@/pages';

export interface PrivateRouteProps {
  isUserPage?: boolean;
  isAdminPage?: boolean;
  isDirectorPage?: boolean;
  isLoginPage?: boolean;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  isUserPage = false,
  isAdminPage = false,
  isDirectorPage = false,
  isLoginPage = false,
}) => {
  const { data: user, isFetching } = useFetchUser();
  console.log(isFetching);

  const userInfo = user?.result;

  const isAuthenticatedUser = userInfo !== undefined;
  const isAdmin = userInfo?.role === 'admin';
  const isDirector = userInfo?.director !== undefined && userInfo?.director !== null;

  if (isUserPage || !isFetching) {
    return isAuthenticatedUser ? <Outlet /> : <Navigate to="/auth/login" />;
  } else if (isDirectorPage || !isFetching) {
    return isDirector ? <Outlet /> : <NotFoundPage />;
  } else if (isAdminPage || !isFetching) {
    return isAdmin ? <Outlet /> : <NotFoundPage />;
  } else if (isLoginPage) {
    return isAuthenticatedUser ? <Navigate to="/" /> : <Outlet />;
  } else {
    return <Outlet />;
  }
};
