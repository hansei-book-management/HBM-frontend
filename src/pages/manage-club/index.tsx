import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaEllipsisV,
  FaLock,
  FaUserSlash,
  FaEllipsisH,
  FaPeopleArrows,
  FaTrash,
} from 'react-icons/fa';

import { MANAGE_CLUB, USER_LIST } from '@/constant';
import {
  Button,
  ClubCodeModal,
  ClubMemberChangeStatusModal,
  ClubMemberExpelModal,
  ClubMemberInfoModal,
} from '@/components';

import * as S from './styled';

export interface ClubModalProps {
  state: boolean;
  isOk: boolean | null;
  page?: number;
  isLoading: boolean;
}

export const ManageClubPage: React.FC = () => {
  const [clubCodeModal, setClubCodeModal] = useState<ClubModalProps>({
    state: false,
    isOk: false,
    isLoading: true,
  });
  const [clubMemberInfoModal, setClubMemberInfoModal] = useState<boolean>(false);
  const [clubCode, setClubCode] = useState<string>('');
  const [clubMemberPopupList, setClubMemberPopupList] = useState(USER_LIST.map(() => false));
  const [clubMemberChangeStatusModal, setClubMemberChangeStatusModal] = useState<ClubModalProps>({
    state: false,
    isOk: null,
    isLoading: false,
  });
  const [clubMemberExpelModal, setClubMemberExpelModal] = useState<ClubModalProps>({
    state: false,
    isOk: null,
    isLoading: false,
  });
  const [clubSettingPopupOpen, setClubSettingPopupOpen] = useState<boolean>(false);
  const [clubChangeDirectorModal, setClubChangeDirectorModal] = useState<ClubModalProps>({
    state: false,
    isOk: null,
    isLoading: false,
    page: 1,
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
    setClubCodeModal({ state: true, isOk: null, isLoading: false });
  };

  const onClubCodeModalClose = () => {
    setClubCodeModal({ state: false, isOk: null, isLoading: false });
    navigate(`${MANAGE_CLUB}`);
  };

  const onClubCodeModalNextPage = () => {
    setClubCodeModal({ state: true, isOk: null, isLoading: true });
    setTimeout(() => {
      setClubCodeModal({ state: true, isOk: true, isLoading: false });
      navigate(`${MANAGE_CLUB}/generate-code?step=2`);
      // fail test
      // setClubCodeModal({ state: true, isOk: false});
    }, 1600);
    setClubCode('앙앙기모링');
  };

  const onClubCodeModalPrevPage = () => {
    setClubCodeModal({ state: true, isOk: null, isLoading: false });
  };

  const onClubCodeCopyText = () => {
    navigator.clipboard.writeText(clubCode);
  };

  // club member status modal FN
  const onClubMemberChangeStatusModalOpen = (userId: string, i: number) => {
    setClubMemberPopupList((prev) => ({ ...prev, [i]: !prev[i] }));
    setClubMemberChangeStatusModal({ state: true, isOk: null, isLoading: false });
    navigate(`${MANAGE_CLUB}/member/${userId}/status?change-step=1`);
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
  const onClubMemberExpelModalOpen = (userId: string, i: number) => {
    setClubMemberPopupList((prev) => ({ ...prev, [i]: !prev[i] }));
    setClubMemberExpelModal({ state: true, isOk: null, isLoading: false });
    navigate(`${MANAGE_CLUB}/member/${userId}/expel?step=1`);
  };

  const onClubMemberExpelModalClose = () => {
    setClubMemberExpelModal({ state: false, isOk: null, isLoading: false });
    navigate(`${MANAGE_CLUB}`);
  };

  const onClubMemberExpelModalNextPage = (userId: string) => {
    setClubMemberExpelModal({ state: true, isOk: null, isLoading: true });
    setTimeout(() => {
      setClubMemberExpelModal({ state: true, isOk: true, isLoading: false });
      navigate(`${MANAGE_CLUB}/member/${userId}/expel?step=2`);
      // fail test
      // setClubMemberExpelModal({ state: true, isOk: false, isLoading: false });
    }, 1000);
  };

  // club change Director modal FN
  const onClubChangeDirectorModalOpen = () => {
    setClubChangeDirectorModal({ state: true, isOk: null, isLoading: false });
    navigate(`${MANAGE_CLUB}/change-director?step=1`);
  };

  const onClubChangeDirectorModalClose = () => {
    setClubChangeDirectorModal({ state: false, isOk: null, isLoading: false });
    navigate(`${MANAGE_CLUB}`);
  };

  const onClubChangeDirectorQuestionModalOpen = () => {
    setClubChangeDirectorModal({ state: true, isOk: null, isLoading: false, page: 2 });
    navigate(`${MANAGE_CLUB}/change-director?step=2`);
  };

  const onClubChangeDirectorStatusModalOpen = () => {
    setClubChangeDirectorModal({ state: true, isOk: null, isLoading: true, page: 2 });
    setTimeout(() => {
      setClubChangeDirectorModal({ state: true, isOk: null, isLoading: false, page: 3 });
      navigate(`${MANAGE_CLUB}/change-director?step=3`);
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
              <S.ManageClubUserIconContainer onClick={() => onClubMemberInfoModalOpen('앙기모링')}>
                <S.ManageClubUserIcon />
                <S.ManageClubUserName>{name}</S.ManageClubUserName>
              </S.ManageClubUserIconContainer>
              <S.ManageClubUserBookInfo onClick={() => onClubMemberInfoModalOpen('앙기모링')}>
                {bookInfo}
              </S.ManageClubUserBookInfo>
              <S.ManageClubUserStatus
                isOk={status}
                onClick={() => onClubMemberInfoModalOpen('앙기모링')}
              >
                {status ? '정상' : '대출정지'}
                <br />
                {errorMessage && `(${errorMessage})`}
              </S.ManageClubUserStatus>
              <S.ManageClubPopupIconWrapper
                onClick={() => setClubMemberPopupList((prev) => ({ ...prev, [i]: !prev[i] }))}
              >
                <FaEllipsisV size={'0.9rem'} />
              </S.ManageClubPopupIconWrapper>
            </S.ManageClubUserContainer>
            <S.ManageClubPopupContainer
              initial="closed"
              animate={clubMemberPopupList[i] ? 'open' : 'closed'}
              variants={{
                open: { opacity: 1, zIndex: 12 },
                closed: { opacity: 0, zIndex: -1 },
              }}
              transition={{ duration: 0.2 }}
            >
              <S.ManageClubPopupDiv
                isOut={false}
                onClick={() => onClubMemberChangeStatusModalOpen('asdf', i)}
              >
                <FaLock size={'0.9rem'} />
                <span>대여정지 해제</span>
              </S.ManageClubPopupDiv>
              <S.ManageClubPopupDiv
                isOut={true}
                onClick={() => onClubMemberExpelModalOpen('asdf', i)}
              >
                <FaUserSlash size={'0.9rem'} />
                <span>추방</span>
              </S.ManageClubPopupDiv>
            </S.ManageClubPopupContainer>
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
      <ClubMemberExpelModal
        onClubMemberExpelModalClose={onClubMemberExpelModalClose}
        onClubMemberExpelModalNextPage={onClubMemberExpelModalNextPage}
        clubMemberExpelModal={clubMemberExpelModal}
      />
      <div style={{ position: 'relative', width: '100%' }}>
        <S.ManageClubPopupIconWrapper
          onClick={() => {
            setClubSettingPopupOpen((prev) => !prev);
          }}
        >
          <FaEllipsisH size={'0.9rem'} />
        </S.ManageClubPopupIconWrapper>
        <S.ManageClubPopupContainer
          isSetting={true}
          initial="closed"
          animate={clubSettingPopupOpen ? 'open' : 'closed'}
          variants={{
            open: { opacity: 1, zIndex: 12 },
            closed: { opacity: 0, zIndex: -1 },
          }}
          transition={{ duration: 0.2 }}
        >
          <S.ManageClubPopupDiv isOut={false}>
            <FaPeopleArrows size={'0.9rem'} />
            <span>부장 변경</span>
          </S.ManageClubPopupDiv>
          <S.ManageClubPopupDiv isOut={true}>
            <FaTrash size={'0.9rem'} />
            <span>동아리 삭제</span>
          </S.ManageClubPopupDiv>
        </S.ManageClubPopupContainer>
      </div>
    </S.ManageClubWrapper>
  );
};
