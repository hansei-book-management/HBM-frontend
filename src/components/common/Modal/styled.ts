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

export const ModalOverlay = styled.div`
  z-index: 9999;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.8);
  /* backdrop-filter: blur(14px); */
`;

export const ModalContainer = styled.div`
  width: 40rem;
  max-height: 40rem;
  padding: 2rem;
  background-color: ${({ theme }) => theme.white};
  backdrop-filter: blur(1.2rem);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
  border-radius: 1.2rem;
  animation: 200ms cubic-bezier(0.33, 1, 0.68, 1) ${modalOpenKeyframe};
  overflow: scroll;
`;

export const ModalContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1.6rem;
  padding-bottom: 2rem;
`;

export const ModalTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 1.1rem;
`;

export const ModalSubTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 2.4rem;
`;

export const ModalInfo = styled.p`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.6rem;
`;

export const ModalContent = styled.p`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.3rem;
`;

export const ModalButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1.6rem;
  width: 100%;
`;

export const ModalButton = styled.button<{ left: boolean }>`
  width: 6.5rem;
  height: 2.2rem;
  background-color: ${({ theme, left }) => (left ? theme.primary.black : theme.primary.blue)};
  border-radius: 0.8rem;
  color: ${({ theme }) => theme.white};
  font-size: 1rem;
  font-weight: 700;
  border: none;
`;
