import React, { useEffect } from 'react';

import { useRecoilState } from 'recoil';

import { ModalState } from '@/atoms';

import * as S from './styled';

export interface ModalProps {
  title?: string;
  info?: React.ReactNode;
  subTitle?: React.ReactNode;
  description?: string;
}

export const Modal: React.FC<ModalProps> = ({ title, info, subTitle, description }) => {
  const [modalActive, setModalActive] = useRecoilState(ModalState);

  const closeModal = () => {
    setModalActive(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
  return (
    <S.ModalOverlay>
      <S.ModalContainer>
        <S.ModalContentContainer>
          <S.ModalTitle>{title}</S.ModalTitle>
          <S.ModalInfo>{info}</S.ModalInfo>
          <S.ModalSubTitle>{subTitle}</S.ModalSubTitle>
          <S.ModalContent>{description}</S.ModalContent>
        </S.ModalContentContainer>
        <S.ModalButtonContainer>
          <S.ModalButton left={true} onClick={closeModal}>
            아니요
          </S.ModalButton>
          <S.ModalButton left={false}>네!</S.ModalButton>
        </S.ModalButtonContainer>
      </S.ModalContainer>
    </S.ModalOverlay>
  );
};
