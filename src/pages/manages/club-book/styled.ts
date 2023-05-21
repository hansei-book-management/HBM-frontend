import styled, { keyframes } from 'styled-components';

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

export const ManageClubBookContainer = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  row-gap: 1rem;
`;

export const AddBookModalContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  row-gap: 2rem;
  width: 100%;
`;

export const AddBookModalTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
`;

export const AddBookModalInputForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  row-gap: 0.4rem;
  width: 100%;
`;

export const AddBookModalInput = styled.input`
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

export const AddBookModalFormErrorMessage = styled.span`
  text-align: left;
  margin-left: 10px;
  font-size: 13px;
  color: #ba1a1a;
`;
