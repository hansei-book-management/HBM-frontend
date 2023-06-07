import { FaUserCircle } from 'react-icons/fa';

import styled from 'styled-components';

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
  grid-template-columns: 2.96fr 1fr 2fr 0.15fr;
  padding: 0.6rem 1rem;
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

export const ManageClubUserContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 0.15fr;
  padding: 1rem 1.4rem;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 1rem;
`;

export const ManageClubUserInfoContainer = styled.div`
  display: grid;
  grid-template-columns: 3.3fr 1.14fr 2.03fr;
  align-items: center;
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
`;
