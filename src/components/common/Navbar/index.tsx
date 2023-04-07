import React from 'react';

import * as S from './styled';

export const Navbar: React.FC = () => {
  return (
    <S.NavBarWrapper>
      <S.NavBarContainer>
        <S.NavbarMenuContainer>
          <S.Title>(동아리명) 도서관리</S.Title>
          <S.MenuItem>대출하기</S.MenuItem>
          <S.MenuItem>대출 관리</S.MenuItem>
        </S.NavbarMenuContainer>
        <S.LoginButton>로그아웃</S.LoginButton>
      </S.NavBarContainer>
    </S.NavBarWrapper>
  );
};
