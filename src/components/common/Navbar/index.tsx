import React from 'react';

import { Menu_LIST } from '@/constant';

import * as S from './styled';

export const Navbar: React.FC = () => {
  return (
    <S.NavBarWrapper>
      <S.NavBarContainer>
        <S.NavbarMenuContainer>
          <S.NavbarTitle>
            <S.TitleLink to="/">(동아리명) 도서관리</S.TitleLink>
          </S.NavbarTitle>
          {Menu_LIST.map(({ text, href }, i) => (
            <S.MenuItem to={href} key={i}>
              {text}
            </S.MenuItem>
          ))}
        </S.NavbarMenuContainer>
        <S.LoginButton>로그아웃</S.LoginButton>
      </S.NavBarContainer>
    </S.NavBarWrapper>
  );
};
