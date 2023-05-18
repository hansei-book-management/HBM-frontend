import React, { useState } from 'react';

import { useModal } from '@/hooks';
import { USER_LIST } from '@/constant';
import { Button, Modal } from '@/components';

import * as S from './styled';

export const ManageClubPage: React.FC = () => {
  const { open, modalActive } = useModal();
  const [inviteCodeClick, setInviteCodeClick] = useState<boolean>(false);
  const [userBoxClick, setUserBoxClick] = useState<boolean>(false);

  const onInviteCodeClick = () => {
    setInviteCodeClick(true);
    setUserBoxClick(false);
    open();
  };

  const onUserBoxClick = () => {
    setUserBoxClick(true);
    setInviteCodeClick(false);
    open();
  };

  return (
    <S.ManageClubWrapper>
      <Button onClick={onInviteCodeClick} to="?generate-code-step=1" description="초대 코드 생성" />
      <S.ManageClubUserMenuContainer>
        <S.ManageClubUserMenuBar>
          <S.ManageClubUserMenuBarItem>부원</S.ManageClubUserMenuBarItem>
          <S.ManageClubUserMenuBarItem>대여 책</S.ManageClubUserMenuBarItem>
          <S.ManageClubUserMenuBarItem>상태</S.ManageClubUserMenuBarItem>
        </S.ManageClubUserMenuBar>
        {USER_LIST.map(({ name, bookInfo, status, errorMessage }) => (
          <S.ManageClubUserInfoContainer onClick={onUserBoxClick}>
            <S.ManageClubUserIconContainer>
              <S.ManageClubUserIcon />
              <S.ManageClubUserName>{name}</S.ManageClubUserName>
            </S.ManageClubUserIconContainer>
            <S.ManageClubUserBookInfo>{bookInfo}</S.ManageClubUserBookInfo>
            <S.ManageClubUserStatus isOk={status}>
              {status ? '정상' : '대출정지'}
              <br />
              {errorMessage && `(${errorMessage})`}
            </S.ManageClubUserStatus>
          </S.ManageClubUserInfoContainer>
        ))}
      </S.ManageClubUserMenuContainer>

      {modalActive && userBoxClick && (
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
      {modalActive && inviteCodeClick && (
        <Modal.OverLay>
          <Modal
            textProps={
              <S.GenerateCodeContainer>
                <S.ModalUserTitle>코드 생성하기</S.ModalUserTitle>
                <S.GenerateCodeSelectContainer>
                  <S.GenerateCodeTitle>유효 기간</S.GenerateCodeTitle>
                  <S.GenerateCodeSelect>
                    <option>1일</option>
                    <option>3일</option>
                    <option>5일</option>
                    <option>7일</option>
                  </S.GenerateCodeSelect>
                </S.GenerateCodeSelectContainer>
                <S.GenerateCodeSelectContainer>
                  <S.GenerateCodeTitle>최대 사용 횟수</S.GenerateCodeTitle>
                  <S.GenerateCodeSelect>
                    <option>1회</option>
                    <option>3회</option>
                    <option>5회</option>
                    <option>7회</option>
                  </S.GenerateCodeSelect>
                </S.GenerateCodeSelectContainer>
              </S.GenerateCodeContainer>
            }
            leftButtonText="닫기"
            rightButtonText="생성하기"
            addModal={true}
          />
        </Modal.OverLay>
      )}
    </S.ManageClubWrapper>
  );
};
