import React from 'react';

import { Navbar, Footer } from '@/components';

import * as S from './styled';

export interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <S.AuthLayoutContainer>
      <Navbar />
      <S.AuthLayoutWrapper>{children}</S.AuthLayoutWrapper>
      <Footer isAuthLayout={true} />
    </S.AuthLayoutContainer>
  );
};
