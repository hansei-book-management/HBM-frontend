import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEllipsisV, FaLock, FaUserSlash } from 'react-icons/fa';

import { MANAGE_CLUB, USER_LIST } from '@/constant';
import {
  Button,
  ClubCodeModal,
  ClubMemberChangeStatusModal,
  ClubMemberInfoModal,
} from '@/components';

import * as S from './styled';

export interface clubModalProps {
  state: boolean;
  isOk: boolean | null;
  page?: number;
  isLoading: boolean;
}

export const ManageClubPage: React.FC = () => {
  const [clubCodeModal, setClubCodeModal] = useState<clubModalProps>({
    state: false,
    isOk: false,
    page: 1,
    isLoading: true,
  });
  const [clubMemberInfoModal, setClubMemberInfoModal] = useState<boolean>(false);
  const [clubCode, setClubCode] = useState<string>('');
  const [clubMemberPopupList, setClubMemberPopupList] = useState(USER_LIST.map(() => false));
  const [clubMemberChangeStatusModal, setClubMemberChangeStatusModal] = useState<clubModalProps>({
    state: false,
    isOk: null,
    isLoading: false,
  });
  const [clubMemberExpelModal, setClubMemberExpelModal] = useState<clubModalProps>({
    state: false,
    isOk: false,
    isLoading: false,
  });

  const navigate = useNavigate();

  // club member info modal FN
  const onClubMemberInfoModalOpen = (userId: string) => {
    setClubMemberInfoModal(true);
    navigate(`${MANAGE_CLUB}/member/${userId}/detail`);
  };

  const onClubMemberInfoModalClose = () => {
    setClubMemberInfoModal(false);
    navigate(`${MANAGE_CLUB}`);
  };

  // club code modal FN
  const onClubCodeModalOpen = () => {
    setClubCodeModal({ state: true, isOk: false, page: 1, isLoading: false });
  };

  const onClubCodeModalClose = () => {
    setClubCodeModal({ state: false, isOk: false, page: 3, isLoading: false });
    navigate(`${MANAGE_CLUB}`);
  };

  const onClubCodeModalNextPage = () => {
    setClubCodeModal({ state: true, isOk: false, page: 1, isLoading: true });
    setTimeout(() => {
      setClubCodeModal({ state: true, isOk: true, page: 2, isLoading: false });
      navigate(`${MANAGE_CLUB}/generate-code?step=2`);
      // fail test
      // setClubCodeModal({ state: true, isOk: false, page: 2 });
    }, 1600);
    setClubCode('앙앙기모링');
  };

  const onClubCodeModalPrevPage = () => {
    setClubCodeModal({ state: true, isOk: false, page: 1, isLoading: false });
  };

  const onClubCodeCopyText = () => {
    navigator.clipboard.writeText(clubCode);
  };

  // club member status modal FN
  const onClubMemberChangeStatusModalOpen = (userId: string, i: number) => {
    setClubMemberChangeStatusModal({ state: true, isOk: null, isLoading: false });
    navigate(`${MANAGE_CLUB}/member/${userId}/status?change-step=1`);
    setClubMemberPopupList((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  const onClubMemberChangeStatusModalClose = () => {
    setClubMemberChangeStatusModal({ state: false, isOk: null, isLoading: false });
    navigate(`${MANAGE_CLUB}`);
  };

  const onClubMemberChangeStatusModalNextPage = (userId: string) => {
    setClubMemberChangeStatusModal({ state: true, isOk: null, isLoading: true });
    setTimeout(() => {
      setClubMemberChangeStatusModal({ state: true, isOk: true, isLoading: false });
      navigate(`${MANAGE_CLUB}/member/${userId}/status?change-step=2`);
      // fail test
      // setClubMemberChangeStatusModal({ state: true, isOk: false, isLoading: false });
    }, 1000);
  };

  // club member expel modal FN
  const onClubMemberExpelModalOpen = (userId: string) => {
    setClubMemberExpelModal({ state: true, isOk: false, isLoading: false });
    navigate(`${MANAGE_CLUB}/member/${userId}/expel?step=1`);
  };

  const onClubMemberExpelModalClose = () => {
    setClubMemberExpelModal({ state: false, isOk: false, isLoading: false });
    navigate(`${MANAGE_CLUB}`);
  };

  const onClubMemberExpelModalNextPage = (userId: string) => {
    setClubMemberExpelModal({ state: true, isOk: false, isLoading: true });
    setTimeout(() => {
      setClubMemberExpelModal({ state: true, isOk: true, isLoading: false });
      navigate(`${MANAGE_CLUB}/member/${userId}/expel?step=2`);
      // fail test
      // setClubMemberExpelModal({ state: true, isOk: false, isLoading: false });
    }, 1000);
  };

  useEffect(() => {
    navigate(`${MANAGE_CLUB}`);
  }, []);

  return (
    <S.ManageClubWrapper>
      <Button
        onClick={onClubCodeModalOpen}
        to={`${MANAGE_CLUB}/generate-code?step=1`}
        description="동아리 코드"
      />
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
              <S.ManageClubMemberPopupDiv
                isOut={false}
                onClick={() => onClubMemberChangeStatusModalOpen('asdf', i)}
              >
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
        clubCodeModal={clubCodeModal}
      />
      <ClubMemberChangeStatusModal
        onClubMemberChangeStatusModalClose={onClubMemberChangeStatusModalClose}
        onClubMemberChangeStatusModalNextPage={() => onClubMemberChangeStatusModalNextPage('asdf')}
        clubMemberChangeStatusModal={clubMemberChangeStatusModal}
      />
    </S.ManageClubWrapper>
  );
};