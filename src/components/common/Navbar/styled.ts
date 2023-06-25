import { Link } from 'react-router-dom';
import { MdDehaze } from 'react-icons/md';

import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

export const MaxWidth = (isUser: boolean) => {
  return isUser ? '630px' : '830px';
};

export const NavBarContainer = styled(motion.nav)<{ isUser: boolean }>`
  width: 100%;
  height: 5rem;
  z-index: 9000;
  position: fixed;
  backdrop-filter: blur(20px);
  @media screen and (min-width: 300px) and (max-width: ${({ isUser }) => MaxWidth(isUser)}) {
    backdrop-filter: blur(30px);
    height: fit-content;
    padding: 1rem 1.5rem;
    display: flex;
    justify-content: space-between;
  }
`;

export const NavBarWrapper = styled.div<{ isUser: boolean }>`
  --max-width: ${({ isUser }) => (isUser ? '630px' : '830px')};
  width: 100%;
  height: 100%;
  margin: 0 auto;
  max-width: 1250px;
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
  column-gap: 1.2rem;
  @media screen and (min-width: 300px) and (max-width: ${({ isUser }) => MaxWidth(isUser)}) {
    flex-direction: column;
    align-items: flex-start;
    height: fit-content;
    row-gap: 2rem;
    padding: 0;
  }
`;

export const NavbarToggleBar = styled(motion.div)<{ isUser: boolean }>`
  --max-width: ${({ isUser }) => (isUser ? '630px' : '830px')};

  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (min-width: 300px) and (max-width: ${({ isUser }) => MaxWidth(isUser)}) {
    width: 100%;
  }
`;

export const NavbarMenuContainer = styled(motion.div)<{ isUser: boolean }>`
  --max-width: ${({ isUser }) => (isUser ? '630px' : '830px')};
  display: flex;
  column-gap: 3rem;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  @media screen and (min-width: 300px) and (max-width: ${({ isUser }) => MaxWidth(isUser)}) {
    width: fit-content;
    flex-direction: column;
    align-items: flex-start;
    &.hidden {
      display: none;
    }
  }
`;

export const NavbarMenuWrapper = styled.div<{ isUser: boolean }>`
  --max-width: ${({ isUser }) => (isUser ? '630px' : '830px')};
  display: flex;
  column-gap: 1rem;
  align-items: center;
  @media screen and (min-width: 300px) and (max-width: ${({ isUser }) => MaxWidth(isUser)}) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 18px;
  }
`;

export const NavbarTitleLink = styled(Link)`
  font-size: 2.2rem;
  font-weight: 500;
  text-decoration: none;
  color: ${({ theme }) => theme.black};
`;

export const NavbarMenuItem = styled(Link)<{ active: boolean }>`
  font-size: 1.2rem;
  font-weight: 600;
  text-decoration: none;
  color: ${({ theme }) => theme.navbar.unselected};
  transition: color 150ms ease-in;
  margin-right: 1rem;
  ${(props) =>
    props.active &&
    css`
      color: ${({ theme }) => theme.black};
    `}
`;

export const NavbarUserContainer = styled.div<{ isUser: boolean }>`
  --max-width: ${({ isUser }) => (isUser ? '630px' : '830px')};

  display: flex;
  align-items: center;
  @media screen and (max-width: ${({ isUser }) => MaxWidth(isUser)}) {
    margin-top: 12px;
  }
`;

export const NavbarUserName = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  margin-right: 16px;
  color: ${({ theme }) => theme.black};
`;

export const NavbarAuthButton = styled.button`
  color: ${({ theme }) => theme.primary.gray};
  background-color: ${({ theme }) => theme.primary.white};
  border-radius: 1.4rem;
  border: none;
  padding: 0.8rem 1.1rem;
  font-size: 1.2rem;
  font-weight: 600;
  align-self: center;
  text-decoration: none;
`;

export const NavbarTogIcon = styled(MdDehaze)<{ isUser: boolean }>`
  margin: 0;
  padding: 0;
  width: 2.4rem;
  height: 2.4rem;
  color: ${({ theme }) => theme.gray};
  @media screen and (min-width: ${({ isUser }) => (isUser ? '631px' : '831px')}) {
    display: none;
  }
`;
