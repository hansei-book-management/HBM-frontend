import React from 'react';

import { Navbar, Footer } from '@/components';
import { useFetchUser, useLogin } from '@/hooks';

import * as S from './styled';

export interface DefaultLayoutProps {
  children: React.ReactNode;
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  const { data: user, isFetching } = useFetchUser();

  return (
    <S.DefaultLayoutContainer>
      <Navbar userInfo={user} fetch={isFetching} />
      <S.DefaultLayoutWrapper>{children}</S.DefaultLayoutWrapper>
      <Footer />
    </S.DefaultLayoutContainer>
  );
};
