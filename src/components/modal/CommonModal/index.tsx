import React, { useState } from 'react';

import { useModal } from '@/hooks/useModal';

import * as S from './styled';

export interface ModalProps {
  onNavigate?: () => void;
  onCloseNavigate?: () => void;
  textProps: React.ReactNode;
  lastPage?: boolean;
  clubAddModal?: boolean;
  disable?: boolean;
  leftButtonText: string;
  rightButtonText: React.ReactNode;
}

export interface ModalOverlayProps {
  children: React.ReactNode;
}

export const ModalElement: React.FC<ModalProps> = ({
  textProps,
  lastPage = false,
  disable = false,
  leftButtonText,
  rightButtonText,
  clubAddModal = false,
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
    <S.ModalContainer isClosed lastPage>
      <S.ModalContentContainer lastPage>{textProps}</S.ModalContentContainer>
      <S.ModalButtonContainer lastPage>
        {lastPage && !clubAddModal ? (
          <S.ModalLastPageButton onClick={closing}>{rightButtonText}</S.ModalLastPageButton>
        ) : (
          <>
            <S.ModalButton left onClick={closing} disable>
              {leftButtonText}
            </S.ModalButton>
            <S.ModalButton onClick={onNavigate || closing}>{rightButtonText}</S.ModalButton>
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
