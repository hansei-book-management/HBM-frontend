import React, { useState } from 'react';

import { useModal } from '@/hooks/useModal';

import * as S from './styled';

export interface ModalProps {
  onNavigate?: () => void;
  onCloseNavigate?: () => void;
  textProps: React.ReactNode;
  statusModal?: boolean;
  smallModal?: boolean;
  disable?: boolean;
  leftButtonText?: string;
  rightButtonText: React.ReactNode;
  onlyRightButton?: boolean;
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
  smallModal = false,
  onlyRightButton,
  onNavigate,
  onCloseNavigate,
}) => {
  const [isClosed, setIsClosed] = useState(false);
  const { close } = useModal();

  const closing = () => {
    if (!disable) {
      setIsClosed(true);
      setTimeout(() => {
        close();
        onCloseNavigate && onCloseNavigate();
      }, 200);
    }
  };

  return (
    <S.ModalContainer isClosed={isClosed} statusModal={statusModal} smallModal={smallModal}>
      <S.ModalContentContainer statusModal={statusModal}>{textProps}</S.ModalContentContainer>
      <S.ModalButtonContainer statusModal={statusModal}>
        {statusModal || onlyRightButton ? (
          <S.StatusModalButton onClick={closing}>{rightButtonText}</S.StatusModalButton>
        ) : (
          <>
            {leftButtonText && (
              <S.ModalButton left onClick={closing} disable={disable}>
                {leftButtonText}
              </S.ModalButton>
            )}
            <S.ModalButton onClick={onNavigate || closing}>{rightButtonText}</S.ModalButton>
          </>
        )}
      </S.ModalButtonContainer>
    </S.ModalContainer>
  );
};

export const ModalOverlay: React.FC<ModalOverlayProps> = ({ children }) => {
  const { close } = useModal();
  return (
    <S.ModalOverlay>
      <S.ModalFuck onClick={close}></S.ModalFuck>
      {children}
    </S.ModalOverlay>
  );
};

export const Modal = Object.assign(ModalElement, {
  OverLay: ModalOverlay,
});
