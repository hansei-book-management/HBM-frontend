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
  const { data: user, isLoading } = useFetchUser();

  const userInfo = user?.result;

  const isAuthenticatedUser = userInfo !== undefined;
  const isAdmin = userInfo?.role === 'admin';
  const isDirector = userInfo?.director !== undefined && userInfo?.director !== null;

  if (isUserPage && !isLoading) {
    return isAuthenticatedUser ? <Outlet /> : <Navigate to="/auth/login" />;
  }

  if (isDirectorPage && !isLoading) {
    return isDirector ? <Outlet /> : <NotFoundPage />;
  }

  if (isAdminPage && !isLoading) {
    return isAdmin ? <Outlet /> : <NotFoundPage />;
  }

  if (isLoginPage) {
    return isAuthenticatedUser ? <Navigate to="/" /> : <Outlet />;
  }

  return !isLoading && <Outlet />;
};
