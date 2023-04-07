import React, { useState } from 'react';

import { useMotionValue, useMotionValueEvent, useScroll } from 'framer-motion';

import { Menu_LIST } from '@/constant';

import * as S from './styled';

export const Navbar: React.FC = () => {
  const [hidden, setHidden] = useState<boolean>(false);

  const { scrollY } = useScroll();
  const prevScrollY = useMotionValue(0); // useMotionValue가 뭐하는 애냐면

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

  return (
    <S.NavBarWrapper
      // variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: -25 } }} // -> 부드럽게 사라지기
      variants={{ visible: { top: '0vh' }, hidden: { top: '-16vh' } }} // -> 말아올리기
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ ease: [0.5, 0.25, 0.3, 1], duration: 0.5 }}
    >
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
        <S.LoginButton to="/signout">로그아웃</S.LoginButton>
      </S.NavBarContainer>
    </S.NavBarWrapper>
  );
};
