import { Link } from 'react-router-dom';
import { MdDehaze } from 'react-icons/md';

import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

export const NavBarContainer = styled(motion.nav)`
  width: 100%;
  height: 5rem;
  z-index: 9000;
  position: fixed;
  backdrop-filter: blur(20px);
  @media screen and (min-width: 300px) and (max-width: 630px) {
    backdrop-filter: blur(30px);
    height: fit-content;
    padding: 1rem 1.5rem;
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
  padding: 0 1.5rem;
  column-gap: 1.2rem;
  @media screen and (min-width: 300px) and (max-width: 630px) {
    flex-direction: column;
    align-items: flex-start;
    height: fit-content;
    row-gap: 2rem;
    padding: 0;
  }
`;

export const ToggleBar = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (min-width: 300px) and (max-width: 630px) {
    width: 100%;
  }
`;

export const NavbarMenuContainer = styled(motion.div)`
  display: flex;
  column-gap: 3rem;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  @media screen and (min-width: 300px) and (max-width: 630px) {
    width: fit-content;
    flex-direction: column;
    align-items: flex-start;
    &.hidden {
      display: none;
    }
  }
`;

export const NavbarMenuWrapper = styled.div`
  display: flex;
  column-gap: 1rem;
  align-items: center;
  @media screen and (min-width: 300px) and (max-width: 630px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 18px;
  }
`;

export const TitleLink = styled(Link)`
  font-size: 26px;
  font-weight: 500;
  text-decoration: none;
  color: ${({ theme }) => theme.black};
`;

export const MenuItem = styled(Link)<{ isActive: boolean }>`
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  color: ${({ theme }) => theme.navbar.unselected};
  transition: color 150ms;
  margin-right: 1rem;
  ${(props) =>
    props.isActive &&
    css`
      color: ${({ theme }) => theme.black};
    `}
`;

export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 630px) {
    margin-top: 12px;
  }
`;

export const UserName = styled.span`
  font-size: 16px;
  font-weight: 600;
  margin-right: 16px;
  color: ${({ theme }) => theme.black};
`;

export const LoginButton = styled(Link)`
  color: ${({ theme }) => theme.primary.gray};
  background-color: ${({ theme }) => theme.primary.white};
  border-radius: 1.4rem;
  border: none;
  padding: 0.8rem 1.1rem;
  font-size: 16px;
  font-weight: 600;
  align-self: center;
  text-decoration: none;
  margin-top: 10px;
`;

export const TogIcon = styled(MdDehaze)`
  margin: 0;
  padding: 0;
  width: 30px;
  height: 30px;
  color: ${({ theme }) => theme.gray};
  @media screen and (min-width: 631px) {
    display: none;
  }
`;
