import React from 'react';
import Lottie from 'react-lottie';
import { useNavigate } from 'react-router-dom';

import { useSetRecoilState } from 'recoil';

import { checkLottieOptions, failLottieOptions } from '@/constant';
import { AddClubState } from '@/atoms';

import { Modal } from '../Modal';

import * as S from './styled';

export interface StatusModalProps {
  url: string;
  title: string;
  isOk: boolean;
  onCloseModal?: () => void;
  message: React.ReactNode;
}

export const StatusModal: React.FC<StatusModalProps> = ({
  url,
  message,
  title,
  isOk,
  onCloseModal,
}) => {
  const setAddClubClick = useSetRecoilState(AddClubState);
  const navigate = useNavigate();

  const onCloseNavigate = () => {
    navigate(`${url}`);
    setAddClubClick({ state: false, isOk: false });
  };

  return (
    <Modal.OverLay>
      <Modal
        textProps={
          <S.StatusModalContainer>
            <Lottie
              options={isOk ? checkLottieOptions : failLottieOptions}
              height={'8rem'}
              width={'8rem'}
            />
            <S.StatusModalTitle>{title}</S.StatusModalTitle>
            <S.StatusModalTextContainer>{message}</S.StatusModalTextContainer>
          </S.StatusModalContainer>
        }
        rightButtonText="확인했어요"
        modalSize="medium"
        statusModal={true}
        isOk={isOk}
        {...(onCloseModal
          ? { leftButtonClick: () => onCloseModal() }
          : { leftButtonClick: () => onCloseNavigate() })}
      />
    </Modal.OverLay>
  );
};
