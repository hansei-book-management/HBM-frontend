import React from 'react';

import { Modal } from '@/components/modal';

import * as S from './styled';

export interface userBookModalProps {
  leftButtonClick: () => void;
}

export const ClubMemberInfoModal: React.FC<userBookModalProps> = ({ leftButtonClick }) => {
  return (
    <Modal.OverLay>
      <Modal
        textProps={
          <S.ModalUserContainer>
            <S.ModalTitle>부원 박찬영</S.ModalTitle>
            <S.ModalUserBookInfoText>현재 대출중인 책: 3권</S.ModalUserBookInfoText>
            <S.ModalUserBookInfo>
              <S.ModalUserBookInfoTitle>너의 이름은:</S.ModalUserBookInfoTitle>
              <S.ModalUserBookInfoStatus isOk={false}>3일 연체됨</S.ModalUserBookInfoStatus>
            </S.ModalUserBookInfo>
            <S.ModalUserBookInfo>
              <S.ModalUserBookInfoTitle>키미노 나마에와:</S.ModalUserBookInfoTitle>
              <S.ModalUserBookInfoStatus isOk={true}> 4일 남음</S.ModalUserBookInfoStatus>
            </S.ModalUserBookInfo>
            <S.ModalUserBookInfo>
              <S.ModalUserBookInfoTitle>what is your fucking name:</S.ModalUserBookInfoTitle>
              <S.ModalUserBookInfoStatus isOk={true}>1주일 남음</S.ModalUserBookInfoStatus>
            </S.ModalUserBookInfo>
          </S.ModalUserContainer>
        }
        leftButtonText="확인"
        modalSize="large"
        leftButtonClick={leftButtonClick}
      />
    </Modal.OverLay>
  );
};
