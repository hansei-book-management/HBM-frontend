import React, { useState } from 'react';

import { useModal } from '@/hooks/useModal';

import * as S from './styled';

export interface ModalProps {
  nextButtonClick?: () => void;
  doneButtonClick?: () => void;
  modalSize: 'small' | 'medium' | 'large';
  textProps: React.ReactNode;
  statusModal?: boolean;
  disable?: boolean;
  leftButtonText?: string;
  rightButtonText: React.ReactNode;
  onlyRightButton?: boolean;
  isOk?: boolean;
}

export interface ModalOverlayProps {
  children: React.ReactNode;
}

export const ModalElement: React.FC<ModalProps> = ({
  textProps,
  statusModal = false,
  disable = false,
  leftButtonText,
  rightButtonText,
  modalSize,
  onlyRightButton,
  nextButtonClick,
  doneButtonClick,
  isOk = false,
}) => {
  const [isClosed, setIsClosed] = useState(false);
  const { close } = useModal();

  const closing = () => {
    if (!disable) {
      setIsClosed(true);
      setTimeout(() => {
        close();
        doneButtonClick && doneButtonClick();
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
            {leftButtonText && (
              <S.ModalButton left onClick={closing} disable={disable}>
                {leftButtonText}
              </S.ModalButton>
            )}
            <S.ModalButton disable={disable} onClick={nextButtonClick}>
              {rightButtonText}
            </S.ModalButton>
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
