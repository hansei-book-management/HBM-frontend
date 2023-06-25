import styled, { css, keyframes } from 'styled-components';

export const modalOpenKeyframe = keyframes`
    0% {
        opacity: 0;
        transform: scale(0.8);
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
        transform: scale(0.8);
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

export const ModalContainer = styled.div<{
  isClosed: boolean;
  statusModal: boolean;
  modalSize: string;
}>`
  z-index: 9903;
  max-height: 40rem;
  padding: 2rem;
  padding-bottom: ${({ statusModal }) => (statusModal ? '2rem' : '0')};
  background-color: ${({ theme }) => theme.white};
  border-radius: 1.2rem;
  box-shadow: 0.4rem 0.2rem 0.8rem 0 rgba(0, 0, 0, 0.4);
  animation: 200ms cubic-bezier(0.33, 1, 0.68, 1)
    ${({ isClosed }) => (isClosed ? modalCloseKeyframe : modalOpenKeyframe)};
  overflow: scroll;
  ${({ modalSize }) => {
    switch (modalSize) {
      case 'large':
        return css`
          width: 50rem;
        `;
      case 'medium':
        return css`
          width: 34rem;
        `;
      case 'small':
        return css`
          width: 28rem;
          padding-bottom: 1rem;
        `;
    }
  }}
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ModalContentContainer = styled.div<{ statusModal: boolean }>`
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  gap: 1.4rem;
  ${({ statusModal }) =>
    statusModal &&
    css`
      align-items: center;
      justify-content: center;
      padding-bottom: 1.5rem;
    `};
`;

export const ModalButtonContainer = styled.div<{ statusModal: boolean }>`
  position: sticky;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  padding: ${({ statusModal }) => (statusModal ? '0' : '1rem 0')};
  width: 100%;
  z-index: 9999;
  background-color: ${({ theme }) => theme.white};
`;

export const ModalButton = styled.button<{
  left?: boolean;
  disable: boolean;
  rightButtonExits?: boolean;
  isRed?: boolean;
}>`
  cursor: pointer;
  width: 8.5rem;
  padding: 0.5rem 0.8rem;
  border-radius: 4.8rem;
  font-size: 1.1rem;
  font-weight: 700;
  border: none;
  transition: background-color 150ms ease-in-out;
  ${({ left, theme, disable, rightButtonExits, isRed }) =>
    left
      ? css`
          background-color: ${rightButtonExits ? theme.primary.black : theme.primary.blue};
          color: ${disable ? '#656565' : theme.white};
          &:hover {
            background-color: '#212121';
          }
        `
      : css`
          color: ${theme.white};
          background-color: ${disable ? '#AAAAAA' : isRed ? theme.primary.red : theme.primary.blue};
          &:hover {
            background-color: ${disable ? '#AAAAAA' : isRed ? '#EA3939' : '#3988FF'};
          }
        `}
`;

export const StatusModalButton = styled.button<{ isOk: boolean }>`
  width: 100%;
  cursor: pointer;
  padding: 0.7rem 0;
  background-color: ${({ isOk, theme }) => (isOk ? theme.primary.blue : theme.primary.statusRed)};
  border-radius: 4.8rem;
  color: ${({ theme }) => theme.white};
  font-size: 1.1rem;
  font-weight: 700;
  border: none;
  transition: background-color 150ms ease-in-out;
  &:hover {
    background-color: ${({ isOk }) => (isOk ? '#3988ff' : '#E46767')};
  }
`;
