import React from 'react';

import { useModal } from '@/hooks';
import { USER_LIST } from '@/constant';
import { Button, Modal } from '@/components';

import * as S from './styled';

export const ManageClubPage: React.FC = () => {
  const { open, modalActive } = useModal();

  const onClick = () => {
    open();
  };

  return (
    <S.ManageClubWrapper>
      <Button to="?generate-code-step=1" description="초대 코드 생성" />
      <S.ManageUserContainer>
        <S.ManageUserMenuBar>
          <S.ManageUserMenuBarItem>부원</S.ManageUserMenuBarItem>
          <S.ManageUserMenuBarItem>대여 책</S.ManageUserMenuBarItem>
          <S.ManageUserMenuBarItem>상태</S.ManageUserMenuBarItem>
        </S.ManageUserMenuBar>
        {USER_LIST.map(({ name, bookInfo, status, errorMessage }) => (
          <S.ManageUserInfoContainer onClick={onClick}>
            <S.ManageUserIconContainer>
              <S.ManageUserIcon />
              <S.ManageUserName>{name}</S.ManageUserName>
            </S.ManageUserIconContainer>
            <S.ManageUserBookInfo>{bookInfo}</S.ManageUserBookInfo>
            <S.ManageUserStatus isOk={status}>
              {status ? '정상' : '대출정지'}
              <br />
              {errorMessage && `(${errorMessage})`}
            </S.ManageUserStatus>
          </S.ManageUserInfoContainer>
        ))}
      </S.ManageUserContainer>

      {modalActive && (
        <Modal.OverLay>
          <Modal
            textProps={
              <S.ModalUserContainer>
                <S.ModalUserTitle>부원 박찬영</S.ModalUserTitle>
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
            rightButtonText="확인"
          />
        </Modal.OverLay>
      )}
    </S.ManageClubWrapper>
  );
};
