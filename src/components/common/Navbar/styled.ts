import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

export const NavBarWrapper = styled(motion.nav)`
  width: 100%;
  height: 5rem;
  z-index: 9999;
  position: fixed;
  background-color: ${({ theme }) => theme.navbar.background};
`;

export const NavBarContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  max-width: 1400px;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const NavbarMenuContainer = styled.div`
  display: flex;
  gap: 3rem;
  align-items: center;
`;

export const NavbarTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
`;

export const TitleLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.white};
`;

export const MenuItem = styled(Link)<{ isActive: boolean }>`
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  color: ${({ theme }) => theme.navbar.unselected};
  transition: color 150ms;
  ${(props) =>
    props.isActive &&
    css`
      color: ${({ theme }) => theme.white};
    `}
`;

export const LoginButton = styled(Link)`
  color: ${({ theme }) => theme.white};
  background-color: ${({ theme }) => theme.navbar.loginButton};
  border-radius: 20px;
  border: none;
  padding: 0.6rem 1.3rem;
  font-size: 1rem;
  font-weight: 600;
  align-self: center;
  text-decoration: none;
`;
