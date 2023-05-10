import { Link } from 'react-router-dom';

import styled, { css, keyframes } from 'styled-components';

export const modalIconShowKeyframes = keyframes`
    0% {
        opacity: 0;
        transform: scale(0.5);
    }

    100% {
        opacity: 1;
        transform: scale(1);
    }
`;

export const ManageClubBookPageContainer = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  row-gap: 1rem;
`;

export const ManageClubBookPageOptionList = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.4rem;
`;

export const ManageClubBookPageOptionItem = styled(Link)<{ isActive: boolean }>`
  padding: 0.75rem 1rem;
  border-radius: 1.2rem;
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 500;
  transition: background 150ms;
  ${(props) =>
    props.isActive
      ? css`
          color: ${props.theme.primary.white};
          background-color: ${props.theme.black};
        `
      : css`
          color: ${props.theme.black};
          background-color: ${props.theme.primary.white};
        `}
`;

export const ManageClubBookPageAddIconWrap = styled.div`
  padding: 0.6rem 1rem;
  border-radius: 1.2rem;
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 200ms ease-in-out;
  color: ${({ theme }) => theme.black};
  background-color: ${({ theme }) => theme.primary.white};
  &:hover {
    color: ${({ theme }) => theme.primary.white};
    background-color: ${({ theme }) => theme.black};
  }
`;

export const ManageClubBookPageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
`;

export const ModalAddBookContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  row-gap: 2rem;
  width: 100%;
`;

export const ModalAddBookTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
`;

export const ModalAddBookInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  row-gap: 0.4rem;
  width: 100%;
`;

export const ModalAddBookInputText = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.black};
`;

export const ModalAddBookInput = styled.input`
  background-color: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => theme.imageBorder};
  padding: 16px;
  align-self: center;
  border-radius: 0.8rem;
  height: 3rem;
  width: 100%;
  font-size: 1rem;
  &::placeholder {
    font-size: 1rem;
    font-weight: 500;
    color: '#9E9E9E';
  }
`;
