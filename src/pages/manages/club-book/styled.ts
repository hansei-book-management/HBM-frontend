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

export const AddBookModalInputContainer = styled.div`
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

export const AddBookModalBookList = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  row-gap: 2rem;
  overflow-y: auto;
  height: 20rem;
  padding-right: 1rem;
  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  &::-webkit-scrollbar-track {
    background-color: #d9d9d9;
    border-radius: 1rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #878787;
    border-radius: 1rem;
  }
`;

export const AddBookModalBookContainer = styled.div<{ select?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  width: 100%;
  height: 12rem;
  border-radius: 2rem;
  transition: background-color 200ms ease-in-out;
  background-color: rgba(0, 133, 255, 0.2);
  cursor: pointer;
  ${({ select }) =>
    select &&
    css`
      background-color: transparent;
    `}
`;

export const AddBookModalBookItem = styled.img`
  height: 100%;
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.imageBorder};
`;

export const AddBookModalBookInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 1rem;
  margin-top: 0.4rem;
  width: 75%;
`;

export const AddBookModalTitleSection = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
`;

export const AddBookModalBookTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 650;
  margin-right: 1rem;
  line-height: 1.4rem;
`;

export const AddBookModalBookAuthor = styled.p`
  font-size: 1rem;
  font-weight: 350;
  line-height: 1.4rem;
`;

export const AddBookModalBookContent = styled(AddBookModalBookAuthor)`
  padding-right: 0.5rem;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  &::-webkit-scrollbar-track {
    background-color: #eaeaea;
    border-radius: 1rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 133, 255, 0.6);
    border-radius: 1rem;
  }
`;

export const StatusModalText = styled.h3`
  font-size: 1.1rem;
  font-weight: 550;
  line-height: 1.8rem;
  justify-self: center;
  align-self: center;
  text-align: center;
`;
