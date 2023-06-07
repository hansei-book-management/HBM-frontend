import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEllipsisV, FaLock, FaUserSlash } from 'react-icons/fa';

import { MANAGE_CLUB, USER_LIST } from '@/constant';
import { Button, ClubCodeModal, ClubMemberInfoModal } from '@/components';

import * as S from './styled';

export const ManageClubPage: React.FC = () => {
  const [clubCodeModal, setClubCodeModal] = useState({
    state: false,
    isOk: false,
    page: 1,
  });
  const [clubMemberInfoModal, setClubMemberInfoModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [clubCode, setClubCode] = useState<string>('');
  const [clubMemberPopupList, setClubMemberPopupList] = useState(USER_LIST.map((v) => false)); // 이 코드를 해석하면 USER_LIST의 길이만큼 false로 채워진 배열이 생성된다.

  const navigate = useNavigate();

  // club member info modal FN
  const onClubMemberInfoModalOpen = (username: string) => {
    setClubMemberInfoModal(true);
    navigate(`${MANAGE_CLUB}?username=${username}`);
  };

  const onClubMemberInfoModalClose = () => {
    setClubMemberInfoModal(false);
    navigate(`${MANAGE_CLUB}`);
  };

  // club code modal FN
  const onClubCodeModalOpen = () => {
    setClubCodeModal({ state: true, isOk: false, page: 1 });
  };

  const onClubCodeModalClose = () => {
    setClubCodeModal({ state: false, isOk: false, page: 3 });
    navigate(`${MANAGE_CLUB}`);
  };

  const onClubCodeModalNextPage = () => {
    navigate(`${MANAGE_CLUB}?generate-code-step=2`);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setClubCodeModal({ state: true, isOk: true, page: 2 });
      // fail test
      // setClubCodeModal({ state: true, isOk: false, page: 2 });
    }, 1000);
    setClubCode('앙앙기모링');
  };

  const onClubCodeModalPrevPage = () => {
    setClubCodeModal({ state: true, isOk: false, page: 1 });
  };

  const onClubCodeCopyText = () => {
    navigator.clipboard.writeText(clubCode);
  };

  useEffect(() => {
    navigate(`${MANAGE_CLUB}`);
  }, []);

  return (
    <S.ManageClubWrapper>
      <Button onClick={onClubCodeModalOpen} to="?generate-code-step=1" description="동아리 코드" />
      <S.ManageClubUserMenuContainer>
        <S.ManageClubUserMenuBar>
          <S.ManageClubUserMenuBarItem>부원</S.ManageClubUserMenuBarItem>
          <S.ManageClubUserMenuBarItem>대여 책</S.ManageClubUserMenuBarItem>
          <S.ManageClubUserMenuBarItem>상태</S.ManageClubUserMenuBarItem>
        </S.ManageClubUserMenuBar>
        {USER_LIST.map(({ name, bookInfo, status, errorMessage }, i) => (
          <S.DummyContainer>
            <S.ManageClubUserContainer>
              <S.ManageClubUserInfoContainer onClick={() => onClubMemberInfoModalOpen('앙기모링')}>
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
              <S.ManageClubMemberPopupIconWrapper
                onClick={() => setClubMemberPopupList((prev) => ({ ...prev, [i]: !prev[i] }))}
              >
                <FaEllipsisV size={'0.9rem'} />
              </S.ManageClubMemberPopupIconWrapper>
            </S.ManageClubUserContainer>
            <S.ManageClubMemberPopupContainer
              initial="closed"
              animate={clubMemberPopupList[i] ? 'open' : 'closed'}
              variants={{
                open: { opacity: 1, zIndex: 12 },
                closed: { opacity: 0, zIndex: -1 },
              }}
              transition={{ duration: 0.2 }}
            >
              <S.ManageClubMemberPopupDiv isOut={false}>
                <FaLock size={'0.9rem'} />
                <span>대여정지 해제</span>
              </S.ManageClubMemberPopupDiv>
              <S.ManageClubMemberPopupDiv isOut={true}>
                <FaUserSlash size={'0.9rem'} />
                <span>추방</span>
              </S.ManageClubMemberPopupDiv>
            </S.ManageClubMemberPopupContainer>
          </S.DummyContainer>
        ))}
      </S.ManageClubUserMenuContainer>
      {clubMemberInfoModal && <ClubMemberInfoModal leftButtonClick={onClubMemberInfoModalClose} />}
      <ClubCodeModal
        onClubCodeModalNextPage={onClubCodeModalNextPage}
        onClubCodeModalClose={onClubCodeModalClose}
        onClubCodeModalPrevPage={onClubCodeModalPrevPage}
        onClubCodeCopyText={onClubCodeCopyText}
        loading={loading}
        clubCodeModal={clubCodeModal}
      />
    </S.ManageClubWrapper>
  );
};
