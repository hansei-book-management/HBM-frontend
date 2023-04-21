import styled, { css, keyframes } from 'styled-components';

export const modalOpenKeyframe = keyframes`
    0% {
        opacity: 0;
        transform: scale(0.5);
    }

    100% {
        opacity: 1;
        transform: scale(1);
    }
`;

export const modalCloseKeyframe = keyframes`
    0% {
        opacity: 1;
        transform: scale(1);
    }
    100% {
        opacity: 0;
        transform: scale(0.2);
    }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9901;
`;

export const ModalContainer = styled.div<{ isClosed: boolean; lastPage: boolean }>`
  z-index: 9903;
  width: ${({ lastPage }) => (lastPage ? '30rem' : '50rem')};
  max-height: 40rem;
  padding: 2rem;
  padding-bottom: ${({ lastPage }) => (lastPage ? '2rem' : '0')};
  background-color: ${({ theme }) => theme.white};
  border-radius: 1.2rem;
  animation: 200ms cubic-bezier(0.33, 1, 0.68, 1)
    ${({ isClosed }) => (isClosed ? modalCloseKeyframe : modalOpenKeyframe)};
  overflow: scroll;
`;

export const ModalContentContainer = styled.div<{ lastPage: boolean }>`
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  gap: 1.4rem;
  ${({ lastPage }) =>
    lastPage &&
    css`
      align-items: center;
      justify-content: center;
      padding-bottom: 1.5rem;
    `};
`;

export const ModalButtonContainer = styled.div<{ lastPage: boolean }>`
  position: sticky;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  padding: ${({ lastPage }) => (lastPage ? '0' : '1rem 0')};
  width: 100%;
  z-index: 9999;
  background-color: ${({ theme }) => theme.white};
`;

export const ModalButton = styled.button<{ left: boolean }>`
  cursor: pointer;
  width: 6.5rem;
  padding: 0.5rem 0.8rem;
  background-color: ${({ theme, left }) => (left ? theme.primary.black : theme.primary.blue)};
  border-radius: 4.8rem;
  color: ${({ theme }) => theme.white};
  font-size: 1.1rem;
  font-weight: 700;
  border: none;
  transition: background-color 150ms ease-in-out;
  &:hover {
    background-color: ${({ left }) => (left ? '#212121' : '#3988FF')};
  }
`;

export const ModalLastPageButton = styled.button`
  width: 100%;
  cursor: pointer;
  padding: 0.7rem 0;
  background-color: ${({ theme }) => theme.primary.blue};
  border-radius: 4.8rem;
  color: ${({ theme }) => theme.white};
  font-size: 1.1rem;
  font-weight: 700;
  border: none;
  transition: background-color 150ms ease-in-out;
  &:hover {
    background-color: #3988ff;
  }
`;
