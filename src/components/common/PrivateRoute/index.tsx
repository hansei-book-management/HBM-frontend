import React from 'react';

import { useFetchUser } from '@/hooks';

export interface PrivateRouteProps {
  needAuth?: boolean;
  roles?: string;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ needAuth, roles = 'user' }) => {
  const { data: user, isFetching } = useFetchUser();

  const isAuthenticatedUser = user?.result !== null;
  const isAdmin = user?.result?.role === 'admin';
};
