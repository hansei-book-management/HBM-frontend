import { FaUserCircle } from 'react-icons/fa';

import styled from 'styled-components';

export const ManageUserContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

export const ManageUserMenuBar = styled.div`
  display: grid;
  grid-template-columns: 2.96fr 1fr 2fr;
  padding: 0.6rem 1rem;
`;

export const ManageUserMenuBarItem = styled.span`
  font-size: 1rem;
  font-weight: 400;
`;

export const ManageUserInfoContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 2fr;
  padding: 1rem 1.4rem;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 1rem;
`;

export const ManageUserIconContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ManageUserIcon = styled(FaUserCircle)`
  width: 1.8rem;
  height: 1.8rem;
  color: ${({ theme }) => theme.primary.gray};
`;

export const ManageUserName = styled.span`
  font-size: 1rem;
  font-weight: 600;
  margin-left: 1rem;
`;

export const ManageUserBookInfo = styled.span`
  font-size: 1rem;
  font-weight: 400;
`;

export const ManageUserStatus = styled.span<{ isOk: boolean }>`
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.45em;
  color: ${({ isOk, theme }) => (isOk ? theme.primary.green : theme.primary.red)};
`;
