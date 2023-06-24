import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useMotionValue, useMotionValueEvent, useScroll } from 'framer-motion';

import {
  ADMIN_NAVBAR_MENU_LIST,
  DIRECTOR_NAVBAR_MENU_LIST,
  USER_NAVBAR_MENU_LIST,
} from '@/constant';
import { useLogout, useFetchUser, useGetWindowSize } from '@/hooks';

import * as S from './styled';

export const Navbar: React.FC = () => {
  const [hidden, setHidden] = useState<boolean>(false);
  const { data: user } = useFetchUser();
  const location = useLocation();
  const { scrollY } = useScroll();
  const prevScrollY = useMotionValue(0);
  const [navbarClose, setNavbarClose] = useState<boolean>(false);
  const navbar = useRef<HTMLDivElement>(null);
  const { getWidth } = useGetWindowSize();
  const navigate = useNavigate();

  const { deleteUserInformation } = useLogout();

  const userInfo = user?.result;

  const handleLogoutButtonClick = useCallback(
    () => deleteUserInformation(),
    [deleteUserInformation],
  );

  const onClick = () => {
    setNavbarClose(!navbarClose);
    if (navbarClose) {
      navbar.current?.classList.remove('hidden');
    } else {
      navbar.current?.classList.add('hidden');
    }
  };

  // const handleScroll = () => {
  //   if (scrollY.get() < scrollY.getPrevious()) {
  //     // 현재 스크롤 값이 전에 있던 스크롤 값보다 작으면 = (스크롤이 위로 올라갔으면) -> hidden = false로
  //     setHidden(false);
  //   } else if (scrollY.get() < 100 && scrollY.get() > scrollY.getPrevious()) {
  //     setHidden(true);
  //   }
  // };

  const handleScroll = () => {
    const currentScrollY = scrollY.get();
    const isScrollingUp = currentScrollY < prevScrollY.get();

    // 스크롤의 Y 값이 증가 중이고, 현재 스크롤의 Y 값이 50보다 큰 경우
    setHidden(currentScrollY > 50 && currentScrollY > prevScrollY.get() && !isScrollingUp);
    prevScrollY.set(currentScrollY);
  };

  useMotionValueEvent(scrollY, 'change', () => {
    handleScroll();
  });

  let navbarMenuList = [];
  if (userInfo?.role === 'admin') {
    navbarMenuList = ADMIN_NAVBAR_MENU_LIST;
  } else if (userInfo?.role === 'director') {
    navbarMenuList = DIRECTOR_NAVBAR_MENU_LIST;
  } else {
    navbarMenuList = USER_NAVBAR_MENU_LIST;
  }

  const isUser = navbarMenuList === USER_NAVBAR_MENU_LIST;

  useEffect(() => {
    if (getWidth > 630) {
      if (navbar.current) {
        navbar.current.classList.remove('hidden');
        navbar.current.style.opacity = '1';
        navbar.current.style.transform = 'none';
      }
    } else if (getWidth <= 630) {
      if (navbar.current) {
        navbar.current.classList.add('hidden');
        navbar.current.style.opacity = '0';
        navbar.current.style.transform = 'translateY(-25px)';
      }
    }
  }, [getWidth]);

  return (
    <S.NavBarContainer
      isUser={isUser}
      // variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: -25 } }} // -> 부드럽게 사라지기
      variants={{ visible: { top: '0vh' }, hidden: { top: '-40vh' } }} // -> 말아올리기
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ ease: [0.5, 0.25, 0.3, 1], duration: 0.5 }}
    >
      <S.NavBarWrapper isUser={isUser}>
        <S.NavbarToggleBar isUser={isUser}>
          <S.NavbarTitleLink to="/">HANBOOK</S.NavbarTitleLink>
          <S.NavbarTogIcon isUser={isUser} onClick={onClick} />
        </S.NavbarToggleBar>
        <S.NavbarMenuContainer
          isUser={isUser}
          variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: -25 } }} // -> 말아올리기
          animate={navbarClose ? 'hidden' : 'visible'}
          transition={{ ease: [0.5, 0.25, 0.3, 1], duration: 0.3 }}
          ref={navbar}
          className="hidden"
        >
          <S.NavbarMenuWrapper isUser={isUser}>
            {navbarMenuList.map(({ text, href }, i) => (
              <S.NavbarMenuItem
                {...(isUser ? getWidth <= 630 && { onClick } : getWidth <= 830 && { onClick })}
                to={href}
                key={i}
                isActive={location.pathname.includes(href)}
              >
                {text}
              </S.NavbarMenuItem>
            ))}
          </S.NavbarMenuWrapper>
          <S.NavbarUserContainer isUser={isUser}>
            {userInfo ? (
              <>
                <S.NavbarUserName>{userInfo?.name}님</S.NavbarUserName>
                <S.NavbarAuthButton onClick={handleLogoutButtonClick}>로그아웃</S.NavbarAuthButton>
              </>
            ) : (
              <S.NavbarAuthButton onClick={() => navigate('/auth/login')}>
                로그인
              </S.NavbarAuthButton>
            )}
          </S.NavbarUserContainer>
        </S.NavbarMenuContainer>
      </S.NavBarWrapper>
    </S.NavBarContainer>
  );
};
