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
  grid-template-columns: 2.96fr 1fr 2fr;
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

export const ManageClubUserInfoContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 2fr;
  padding: 1rem 1.4rem;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 1rem;
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

export const ModalUserContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  gap: 0.8rem;
`;

export const ModalTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
`;

export const ModalUserBookInfoText = styled.span`
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 2rem;
`;

export const ModalUserBookInfo = styled.div`
  display: flex;
`;

export const ModalUserBookInfoTitle = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
`;

export const ModalUserBookInfoStatus = styled(ModalUserBookInfoTitle)<{ isOk: boolean }>`
  margin-left: 0.8rem;
  color: ${({ isOk, theme }) => (isOk ? theme.primary.green : theme.primary.red)};
`;

export const GenerateCodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  row-gap: 1.6rem;
`;

export const GenerateCodeSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: 0.6rem;
`;

export const GenerateCodeTitle = styled.h3`
  font-size: 1rem;
  font-weight: 500;
`;

export const GenerateCodeSelect = styled.select`
  background-color: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => theme.imageBorder};
  padding: 14px;
  align-self: center;
  border-radius: 0.8rem;
  height: 3rem;
  width: 100%;
  caret-color: auto;
  appearance: none;
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.black};
`;

export const InviteCodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  row-gap: 2rem;
`;

export const InviteCodeSubTitleContainer = styled.div`
  margin-top: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  font-size: 0.8rem;
  font-weight: 400;

  a {
    color: ${({ theme }) => theme.primary.darkBlue};
    font-size: 0.9rem;
    font-weight: 450;
    text-decoration: none;
    transition: opacity 200ms ease-in-out;
    &:hover {
      opacity: 0.6;
    }
  }
`;

export const InviteCodeValueContainer = styled.div`
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 1rem;
  width: 90%;
  background-color: ${({ theme }) => theme.imageBorder};
  height: 2.6rem;
  border-radius: 2rem;
`;

export const InviteCodeText = styled.span`
  font-size: 1rem;
  font-weight: 400;
  color: #6f6f6f;
`;

export const InviteCodeCopyButtonWrapper = styled.div`
  border-radius: 50%;
  width: 3rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 100ms ease-in-out;
  cursor: pointer;
  &:active {
    background-color: #b3b3b3;
  }
`;
