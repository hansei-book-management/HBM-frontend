import React, { useState } from 'react';

import { useModal } from '@/hooks/useModal';

import * as S from './styled';

export interface ModalProps {
  onNavigate?: () => void;
  onCloseNavigate?: () => void;
  textProps?: React.ReactNode;
  lastPage?: boolean;
  disable?: boolean;
  leftButtonText: string;
  rightButtonText: React.ReactNode;
}

export interface ModalOverlayProps {
  children?: React.ReactNode;
}

export const ModalElement: React.FC<ModalProps> = ({
  textProps,
  lastPage,
  disable,
  leftButtonText,
  rightButtonText,
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
    <S.ModalContainer isClosed={isClosed} lastPage={lastPage || false}>
      <S.ModalContentContainer lastPage={lastPage || false}>{textProps}</S.ModalContentContainer>
      <S.ModalButtonContainer lastPage={lastPage || false}>
        {lastPage ? (
          <S.ModalLastPageButton onClick={closing}>{rightButtonText}</S.ModalLastPageButton>
        ) : (
          <>
            <S.ModalButton left={true} onClick={closing} disable={disable}>
              {leftButtonText}
            </S.ModalButton>
            <S.ModalButton left={false} onClick={onNavigate || closing}>
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
