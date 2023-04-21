import styled, { keyframes } from 'styled-components';

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

export const ModalContainer = styled.div<{ isClosed: boolean }>`
  z-index: 9903;
  width: 50rem;
  max-height: 38rem;
  padding: 2rem;
  padding-bottom: 0;
  background-color: ${({ theme }) => theme.white};
  backdrop-filter: blur(1.2rem);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
  border-radius: 1.2rem;
  animation: 200ms cubic-bezier(0.33, 1, 0.68, 1)
    ${({ isClosed }) => (isClosed ? modalCloseKeyframe : modalOpenKeyframe)};
  overflow: scroll;
`;

export const ModalContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1.4rem;
  padding-bottom: 1rem;
`;

export const ModalButtonContainer = styled.div`
  position: sticky;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1.6rem;
  padding: 1rem 0rem;
  width: 100%;
  z-index: 9999;
  background-color: ${({ theme }) => theme.white};
`;

export const ModalButton = styled.button<{ left: boolean }>`
  width: 6.5rem;
  height: 2.2rem;
  background-color: ${({ theme, left }) => (left ? theme.primary.black : theme.primary.blue)};
  border-radius: 4.8rem;
  color: ${({ theme }) => theme.white};
  font-size: 1rem;
  font-weight: 700;
  border: none;
`;
