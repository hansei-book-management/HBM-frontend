import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useMotionValue, useMotionValueEvent, useScroll } from 'framer-motion';

import { ADMIN_NAVBAR_MENU_LIST } from '@/constant';
import { useGetWindowSize } from '@/hooks';

import * as S from './styled';

export const Navbar: React.FC = () => {
  const [hidden, setHidden] = useState<boolean>(false);
  const location = useLocation();
  const { scrollY } = useScroll();
  const prevScrollY = useMotionValue(0);
  const [navbarClose, setNavbarClose] = useState<boolean>(false);
  const navbar = useRef<HTMLDivElement>(null);
  const { getWidth } = useGetWindowSize();

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
      // variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: -25 } }} // -> 부드럽게 사라지기
      variants={{ visible: { top: '0vh' }, hidden: { top: '-40vh' } }} // -> 말아올리기
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ ease: [0.5, 0.25, 0.3, 1], duration: 0.5 }}
    >
      <S.NavBarWrapper>
        <S.ToggleBar>
          <S.TitleLink to="/">HANBOOK</S.TitleLink>
          <S.TogIcon onClick={onClick} />
        </S.ToggleBar>
        <S.NavbarMenuContainer
          variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: -25 } }} // -> 말아올리기
          animate={navbarClose ? 'hidden' : 'visible'}
          transition={{ ease: [0.5, 0.25, 0.3, 1], duration: 0.3 }}
          ref={navbar}
          className="hidden"
        >
          <S.NavbarMenuWrapper>
            {ADMIN_NAVBAR_MENU_LIST.map(({ text, href }, i) => (
              <S.MenuItem
                {...(getWidth <= 630 && { onClick })}
                to={href}
                key={i}
                isActive={location.pathname.includes(href)}
              >
                {text}
              </S.MenuItem>
            ))}
          </S.NavbarMenuWrapper>
          <S.UserContainer>
            {/* <S.UserName>앙기모링님</S.UserName> */}
            <S.LoginButton to="/auth/login">로그인</S.LoginButton>
          </S.UserContainer>
        </S.NavbarMenuContainer>
      </S.NavBarWrapper>
    </S.NavBarContainer>
  );
};
