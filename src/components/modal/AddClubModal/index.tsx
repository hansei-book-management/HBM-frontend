import React from 'react';
import Lottie from 'react-lottie';

import { loadingLottieOptions } from '@/constant';

import { Modal } from '../CommonModal';
import { StatusModal } from '../StatusModal';

import * as S from './styled';

export interface AddClubModalProps {
  modalActive: boolean;
  addClubModalActive: {
    isOk: boolean;
    state: boolean;
  };
  nextButtonClick: () => void;
  doneButtonClick: () => void;
  loading: boolean;
  url: string;
}

export const AddClubModal: React.FC<AddClubModalProps> = ({
  modalActive,
  addClubModalActive: { isOk, state },
  nextButtonClick,
  doneButtonClick,
  loading,
  url,
}) => {
  if (modalActive && !isOk && state) {
    return (
      <Modal.OverLay>
        <Modal
          textProps={
            <S.ModalContainer>
              <S.ModalTitle>동아리 회원 등록</S.ModalTitle>
              <S.ModalAddClubInputContainer>
                <S.AddClubModalInputText>인증키 입력</S.AddClubModalInputText>
                <S.AddClubModalInput placeholder="동아리 인증키를 입력해주세요..." />
              </S.ModalAddClubInputContainer>
            </S.ModalContainer>
          }
          leftButtonText="취소"
          rightButtonText={
            loading ? (
              <Lottie options={loadingLottieOptions} height={'1.2rem'} width={'2.6rem'} />
            ) : (
              '등록'
            )
          }
          modalSize="medium"
          statusDisable={loading}
          {...(!loading && {
            nextButtonClick: () => nextButtonClick(),
            doneButtonClick: () => doneButtonClick(),
          })}
        />
      </Modal.OverLay>
    );
  }
  if (modalActive && isOk && state) {
    return <StatusModal url={`${url}`} />;
  }
  return null;
};
