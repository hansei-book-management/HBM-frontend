import React from 'react';

import * as S from './styled';

export interface DefaultLayoutProps {
  children: React.ReactNode;
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <S.DefaultLayoutContainer>
      <div></div>
      <h1>{children}</h1>
      <div></div>
    </S.DefaultLayoutContainer>
  );
};
