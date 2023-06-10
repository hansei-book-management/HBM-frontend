import React, { useState } from 'react';

import { useModal } from '@/hooks/useModal';

import * as S from './styled';

export interface ModalStateProps {
  state: boolean;
  isOk?: boolean | null;
  page?: number;
  isLoading?: boolean;
}

export interface ModalProps {
  rightButtonClick?: () => void;
  leftButtonClick?: () => void;
  modalSize: 'small' | 'medium' | 'large';
  textProps: React.ReactNode;
  statusModal?: boolean;
  statusDisable?: boolean;
  returnBookDisable?: boolean;
  leftButtonText?: string;
  rightButtonText?: React.ReactNode;
  onlyRightButton?: boolean;
  isOk?: boolean;
  isRed?: boolean;
}

export interface ModalOverlayProps {
  children: React.ReactNode;
}

export const ModalElement: React.FC<ModalProps> = ({
  textProps,
  statusModal = false,
  statusDisable = false,
  returnBookDisable = false,
  leftButtonText,
  rightButtonText,
  modalSize,
  onlyRightButton,
  rightButtonClick,
  leftButtonClick,
  isRed = false,
  isOk = false,
}) => {
  const [isClosed, setIsClosed] = useState(false);
  const { close } = useModal();

  const closing = () => {
    if (!statusDisable) {
      setIsClosed(true);
      setTimeout(() => {
        close();
        leftButtonClick && leftButtonClick();
      }, 200);
    }
  };

  return (
    <S.ModalContainer isClosed={isClosed} statusModal={statusModal} modalSize={modalSize}>
      <S.ModalContentContainer statusModal={statusModal}>{textProps}</S.ModalContentContainer>
      <S.ModalButtonContainer statusModal={statusModal}>
        {statusModal || onlyRightButton ? (
          <S.StatusModalButton onClick={closing} isOk={isOk}>
            {rightButtonText}
          </S.StatusModalButton>
        ) : (
          <>
            {(rightButtonText && (
              <>
                <S.ModalButton
                  left
                  onClick={closing}
                  disable={statusDisable}
                  rightButtonExits={true}
                >
                  {leftButtonText}
                </S.ModalButton>
                <S.ModalButton isRed={isRed} disable={returnBookDisable} onClick={rightButtonClick}>
                  {rightButtonText}
                </S.ModalButton>
              </>
            )) ||
              (!rightButtonText && (
                <S.ModalButton
                  left
                  onClick={closing}
                  disable={statusDisable}
                  rightButtonExits={false}
                >
                  {leftButtonText}
                </S.ModalButton>
              ))}
          </>
        )}
      </S.ModalButtonContainer>
    </S.ModalContainer>
  );
};

export const ModalOverlay: React.FC<ModalOverlayProps> = ({ children }) => {
  return <S.ModalOverlay>{children}</S.ModalOverlay>;
};

export const Modal = Object.assign(ModalElement, {
  OverLay: ModalOverlay,
});
