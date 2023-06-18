import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useFetchUser } from '@/hooks';
import { NotFoundPage } from '@/pages';

export interface PrivateRouteProps {
  isUserPage?: boolean;
  isAdminPage?: boolean;
  isDirectorPage?: boolean;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  isUserPage = false,
  isAdminPage = false,
  isDirectorPage = false,
}) => {
  const { data: user } = useFetchUser();

  const userInfo = user?.result;

  const isAuthenticatedUser = userInfo !== undefined;
  const isAdmin = userInfo?.role === 'admin';
  const isDirector = userInfo?.director !== undefined && userInfo?.director !== null;

  if (isUserPage) {
    return isAuthenticatedUser ? <Outlet /> : <Navigate to="/auth/login" />;
  } else if (isDirectorPage) {
    return isDirector ? <Outlet /> : <NotFoundPage />;
  } else if (isAdminPage) {
    return isAdmin ? <Outlet /> : <NotFoundPage />;
  } else {
    return <Outlet />;
  }
};
