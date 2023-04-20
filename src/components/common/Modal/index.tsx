import React, { useState } from 'react';

import { useModal } from '@/hooks/useModal';

import * as S from './styled';

export interface ModalProps {
  sectionProps?: React.ReactNode;
}

export interface ModalOverlayProps {
  children?: React.ReactNode;
}

export const ModalElement: React.FC<ModalProps> = ({ sectionProps }) => {
  const [isClosed, setIsClosed] = useState(false);
  const { closeModal, openModal } = useModal();

  const closing = () => {
    setIsClosed(true);
    setTimeout(() => {
      closeModal();
    }, 200);
  };

  return (
    <S.ModalContainer onClick={openModal} isClosed={isClosed}>
      <S.ModalContentContainer>{sectionProps}</S.ModalContentContainer>
      <S.ModalButtonContainer>
        <S.ModalButton left={true} onClick={closing}>
          아니요
        </S.ModalButton>
        <S.ModalButton left={false} onClick={() => alert('asdf')}>
          네!
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
