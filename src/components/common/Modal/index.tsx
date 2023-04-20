import React, { useEffect } from 'react';

import { useRecoilState } from 'recoil';

import { ModalState } from '@/atoms';
import { useModal } from '@/hooks/useModal';

import * as S from './styled';

export interface ModalProps {
  title?: string;
  info?: React.ReactNode;
  subTitle?: React.ReactNode;
  description?: string;
}

export const ModalElement: React.FC<ModalProps> = ({ title, info, subTitle, description }) => {
  const { closeModal } = useModal();
  return (
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
  );
};

const ModalContainer: React.FC = () => {
  const { closeModal } = useModal();

  return (
    <Modal.OverLay onClick={closeModal}>
      <Modal />
    </Modal.OverLay>
  );
};

export const Modal = Object.assign(ModalElement, {
  OverLay: S.ModalOverlay,
  Container: ModalContainer,
});
