import React from 'react';

import * as S from './styled';

export const ManageUserPage: React.FC = () => {
  return (
    <S.ManageUserContainer>
      <S.ManageUserMenuBar>
        <S.ManageUserMenuBarItem>부원</S.ManageUserMenuBarItem>
        <S.ManageUserMenuBarItem>대여 책</S.ManageUserMenuBarItem>
        <S.ManageUserMenuBarItem>상태</S.ManageUserMenuBarItem>
      </S.ManageUserMenuBar>
      <S.ManageUserInfoContainer>
        <S.ManageUserIconContainer>
          <S.ManageUserIcon />
          <S.ManageUserName>박찬영</S.ManageUserName>
        </S.ManageUserIconContainer>
        <S.ManageUserBookInfo>0권</S.ManageUserBookInfo>
        <S.ManageUserStatus isOk={false}>
          대출정지 <br />
          (8일 12시간 20분 남음)
        </S.ManageUserStatus>
      </S.ManageUserInfoContainer>
      <S.ManageUserInfoContainer>
        <S.ManageUserIconContainer>
          <S.ManageUserIcon />
          <S.ManageUserName>박찬영</S.ManageUserName>
        </S.ManageUserIconContainer>
        <S.ManageUserBookInfo>3권</S.ManageUserBookInfo>
        <S.ManageUserStatus isOk={true}>정상</S.ManageUserStatus>
      </S.ManageUserInfoContainer>
      <S.ManageUserInfoContainer>
        <S.ManageUserIconContainer>
          <S.ManageUserIcon />
          <S.ManageUserName>박찬영</S.ManageUserName>
        </S.ManageUserIconContainer>
        <S.ManageUserBookInfo>0권</S.ManageUserBookInfo>
        <S.ManageUserStatus isOk={true}>정상</S.ManageUserStatus>
      </S.ManageUserInfoContainer>
    </S.ManageUserContainer>
  );
};
