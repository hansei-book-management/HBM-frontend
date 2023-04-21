import React, { useState } from 'react';

import { useModal } from '@/hooks/useModal';

import * as S from './styled';

export interface ModalProps {
  onNavigate?: () => void;
  onCloseNavigate?: () => void;
  sectionProps?: React.ReactNode;
  leftButtonText: string;
  rightButtonText: React.ReactNode;
}

export interface ModalOverlayProps {
  children?: React.ReactNode;
}

export const ModalElement: React.FC<ModalProps> = ({
  sectionProps,
  leftButtonText,
  rightButtonText,
  onNavigate,
  onCloseNavigate,
}) => {
  const [isClosed, setIsClosed] = useState(false);
  const { close } = useModal();

  const closing = () => {
    onCloseNavigate && onCloseNavigate();
    setIsClosed(true);
    setTimeout(() => {
      close();
    }, 200);
  };

  return (
    <S.ModalContainer isClosed={isClosed}>
      <S.ModalContentContainer>{sectionProps}</S.ModalContentContainer>
      <S.ModalButtonContainer>
        <S.ModalButton left={true} onClick={closing}>
          {leftButtonText}
        </S.ModalButton>
        <S.ModalButton left={false} onClick={onNavigate}>
          {rightButtonText}
        </S.ModalButton>
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
