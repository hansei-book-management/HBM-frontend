import React from 'react';
import { MdLocationOff, MdNotListedLocation } from 'react-icons/md';

import { Modal } from '../CommonModal';

import * as S from './styled';

export interface ReturnBookModalProps {
  modalActive: boolean;
  returnBookModalActive: {
    state: boolean;
    isOk: boolean;
  };
  allowLocation: {
    state: boolean;
    loading: boolean;
  };
  doneButtonClick: () => void;
  nextButtonClick: () => void;
}

export const ReturnBookModal: React.FC<ReturnBookModalProps> = ({
  modalActive,
  returnBookModalActive: { state: returnBookModalState, isOk: returnBookModalIsOk },
  allowLocation: { state: allowLocationState, loading: allowLocationLoading },
  doneButtonClick,
  nextButtonClick,
}) => {
  if (modalActive && returnBookModalState && !allowLocationState && !allowLocationLoading) {
    return (
      <Modal.OverLay>
        <Modal
          textProps={
            <S.ModalContainer>
              <S.ModalTitle>도서 반납하기</S.ModalTitle>
              <S.ReturnBookModalContainer>
                <MdLocationOff size={'8rem'} color={'#828282'} />
                <S.ReturnBookModalTitle>위치를 식별할 수 없음</S.ReturnBookModalTitle>
                <S.ReturnBookModalMessage>
                  안전하게 반납하기 위해서 위치 권한이 필요해요. <br />
                  브라우저의 설정을 확인해 주세요.
                </S.ReturnBookModalMessage>
              </S.ReturnBookModalContainer>
            </S.ModalContainer>
          }
          leftButtonText="닫기"
          rightButtonText="반납하기"
          modalSize="medium"
          doneButtonClick={doneButtonClick}
          returnBookDisable={true}
        />
      </Modal.OverLay>
    );
  }
  if (modalActive && returnBookModalState && allowLocationState && !allowLocationLoading) {
    return (
      <Modal.OverLay>
        <Modal
          textProps={
            <S.ModalContainer>
              <S.ModalTitle>도서 반납하기</S.ModalTitle>
              <S.ReturnBookModalContainer>
                <MdNotListedLocation size={'8rem'} color={'#828282'} />
                <S.ReturnBookModalTitle>알 수 없는 위치</S.ReturnBookModalTitle>
                <S.ReturnBookModalMessage>
                  학교가 아닌 장소에서는 반납처리를 할 수 없어요.
                  <br />
                  학교에서 반납을 해주세요.
                </S.ReturnBookModalMessage>
              </S.ReturnBookModalContainer>
            </S.ModalContainer>
          }
          leftButtonText="닫기"
          rightButtonText="반납하기"
          modalSize="medium"
          doneButtonClick={doneButtonClick}
          returnBookDisable={true}
        />
      </Modal.OverLay>
    );
  }
  return null;
};
