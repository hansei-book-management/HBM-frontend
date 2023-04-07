import { motion } from 'framer-motion';
import styled from 'styled-components';

export const NavBarContainer = styled(motion.div)`
  width: 100%;
  padding: 2rem;
  height: 8rem;
  z-index: 9999;
  /* border: 1px solid red; */
  background-color: ${({ theme }) => theme.navbar.background};
  display: flex;
`;

export const Title = styled.h1``;
