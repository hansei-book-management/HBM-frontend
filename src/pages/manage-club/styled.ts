import { FaUserCircle } from 'react-icons/fa';

import { motion } from 'framer-motion';
import styled, { keyframes } from 'styled-components';

export const popupCloseKeyframe = keyframes`
   0% {
        opacity: 1;
        transform: scale(1);
    }
    100% {
        opacity: 0;
        transform: scale(0.4);
    }
`;

export const ManageClubWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  width: 100%;
  height: 100%;
  align-items: flex-end;
  justify-content: center;
`;

export const ManageClubUserMenuContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

export const ManageClubUserMenuBar = styled.div`
  display: grid;
  grid-template-columns: 3.1fr 1.06fr 2.04fr 0.2fr;
  padding: 0.6rem 1rem;
  width: 100%;
`;

export const ManageClubUserMenuBarItem = styled.span`
  font-size: 1rem;
  font-weight: 400;
`;

export const ManageClubAddCodeButton = styled.button`
  padding: 0.8rem 2rem;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.primary.darkBlue};
  color: ${({ theme }) => theme.white};
  font-size: 1rem;
  font-weight: 600;
  border: none;
  @media screen and (max-width: 2600px) and (min-width: 1000px) {
    font-size: 1rem;
  }
`;

export const DummyContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  flex-direction: column;
  position: relative;
`;

export const ManageClubUserContainer = styled.div`
  display: grid;
  grid-template-columns: 3.1fr 1.06fr 2.04fr 0.2fr;
  padding: 1rem 1.4rem;
  align-items: center;
  background-color: #f7f7f7;
  border-radius: 1rem;
  z-index: 10;
  width: 100%;
`;

export const ManageClubUserIconContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ManageClubUserIcon = styled(FaUserCircle)`
  width: 1.8rem;
  height: 1.8rem;
  color: ${({ theme }) => theme.primary.gray};
`;

export const ManageClubUserName = styled.span`
  font-size: 1rem;
  font-weight: 600;
  margin-left: 1rem;
`;

export const ManageClubUserBookInfo = styled.span`
  font-size: 1rem;
  font-weight: 400;
`;

export const ManageClubUserStatus = styled.span<{ isOk: boolean }>`
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.45em;
  color: ${({ isOk, theme }) => (isOk ? theme.primary.green : theme.primary.red)};
  margin-right: 1rem;
`;

export const ManageClubPopupIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
  width: 2.1rem;
  border-radius: 50%;
  transition: background-color 200ms ease-in-out;
  &:hover {
    background-color: #eaeaea;
  }
  z-index: 9999;
`;

export const ManageClubPopupContainer = styled(motion.div)<{ isSetting?: boolean }>`
  margin-right: 0.6rem;
  width: 16rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  position: absolute;
  top: ${({ isSetting }) => (isSetting ? '2.4rem' : '3.8rem')};
  margin-right: 2rem;
`;

export const ManageClubPopupDiv = styled.div<{ isOut: boolean }>`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0.8rem 1rem;
  column-gap: 0.4rem;
  color: ${({ isOut }) => (isOut ? '#D83333' : 'black')};
  border-radius: ${({ isOut }) => (isOut ? '0 0 1rem 1rem' : '1rem 1rem 0 0')};
  transition: background-color 200ms ease-in-out;
  &:hover {
    background-color: #f5f5f5;
  }
`;
