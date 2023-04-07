import { motion } from 'framer-motion';
import styled from 'styled-components';

export const NavBarWrapper = styled(motion.div)`
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

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
`;

export const MenuItem = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
`;

export const LoginButton = styled.button`
  color: ${({ theme }) => theme.white};
  background-color: ${({ theme }) => theme.navbar.loginButton};
  border-radius: 20px;
  border: none;
  padding: 0.6rem 1.3rem;
  font-size: 1rem;
  font-weight: 600;
  align-self: center;
`;
