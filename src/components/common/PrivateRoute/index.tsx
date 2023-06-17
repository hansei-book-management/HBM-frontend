import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useFetchUser } from '@/hooks';

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

  const userInfo = user?.userInfo?.result;

  const isAuthenticatedUser = userInfo !== undefined;
  const isAdmin = userInfo?.role === 'admin';
  const isDirector =
    Array.isArray(user?.userClubInfo?.result) &&
    user?.userClubInfo?.result.some((club) => {
      return club.director === userInfo?.uid;
    });

  if (isUserPage) {
    return isAuthenticatedUser ? <Outlet /> : <Navigate to="/auth/login" />;
  } else if (isDirectorPage) {
    return isDirector ? <Outlet /> : <Navigate to="/auth/login" />;
  } else if (isAdminPage) {
    return isAdmin ? <Outlet /> : <Navigate to="/auth/login" />;
  } else {
    return isAuthenticatedUser ? <Outlet /> : <Outlet />;
  }
};
