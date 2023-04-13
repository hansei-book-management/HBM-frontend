import { Link } from 'react-router-dom';
import { MdDehaze } from 'react-icons/md';

import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

export const NavBarContainer = styled(motion.nav)`
  width: 100%;
  height: 5rem;
  z-index: 9998;
  position: fixed;
  backdrop-filter: blur(10px);
  @media screen and (min-width: 300px) and (max-width: 630px) {
    height: fit-content;
    padding: 16px 1.5rem;
    display: flex;
    justify-content: space-between;
  }
`;

export const NavBarWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  max-width: 1250px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (min-width: 300px) and (max-width: 630px) {
    flex-direction: column;
    align-items: flex-start;
    height: fit-content;
    row-gap: 1rem;
    padding: 0;
  }
`;

export const ToggleBar = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const NavbarMenuContainer = styled(motion.div)`
  display: flex;
  row-gap: 3rem;
  align-items: center;
  @media screen and (min-width: 300px) and (max-width: 630px) {
    flex-direction: column;
    align-items: flex-start;
    row-gap: 2rem;
  }
  &.active {
    display: none;
  }
`;

export const TitleLink = styled(Link)`
  font-size: 26px;
  font-weight: 500;
  text-decoration: none;
  color: ${({ theme }) => theme.black};
  @media screen and (min-width: 300px) and (max-width: 630px) {
    margin-bottom: 16px;
  }
`;

export const MenuItem = styled(Link)<{ isActive: boolean }>`
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  color: ${({ theme }) => theme.navbar.unselected};
  transition: color 150ms;
  ${(props) =>
    props.isActive &&
    css`
      color: ${({ theme }) => theme.black};
    `}
`;

export const UserName = styled.span`
  font-size: 16px;
  font-weight: 600;
  margin-right: 16px;
  color: ${({ theme }) => theme.primary.black};
`;

export const LoginButton = styled(Link)`
  color: ${({ theme }) => theme.primary.black};
  background-color: ${({ theme }) => theme.primary.white};
  border-radius: 1.4rem;
  border: none;
  padding: 12px 18px;
  font-size: 16px;
  font-weight: 600;
  align-self: center;
  text-decoration: none;
`;

export const TogIcon = styled(MdDehaze)`
  margin: 0;
  padding: 0;
  width: 30px;
  height: 30px;
  color: ${({ theme }) => theme.black};
  @media screen and (min-width: 631px) {
    display: none;
  }
`;
