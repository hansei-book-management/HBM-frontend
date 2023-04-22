import React from 'react';

import { useModal } from '@/hooks';
import { USER_LIST } from '@/constant';

import * as S from './styled';

export const ManageUserPage: React.FC = () => {
  const { open, modalActive } = useModal();

  const onClick = () => {
    open();
  };

  return (
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
  );
};
