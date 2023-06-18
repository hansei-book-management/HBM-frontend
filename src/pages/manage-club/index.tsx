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

import { useRecoilState } from 'recoil';

import { MANAGE_CLUB, USER_LIST } from '@/constant';
import {
  Button,
  ClubChangeDirectorModal,
  ClubCodeModal,
  ClubMemberInfoModal,
  CommonModal,
  ModalStateProps,
} from '@/components';
import { useFetchUser, useGetClubMembers } from '@/hooks';
import { GetClubMembers } from '@/api';
import { generateClubCodeModal } from '@/atoms';

import * as S from './styled';

export const ManageClubPage: React.FC = () => {
  const { data: userData } = useFetchUser();
  const cid = userData?.result?.director?.cid;
  const { data: clubMembers } = useGetClubMembers(cid);

  const [clubMemberInfoModal, setClubMemberInfoModal] = useState<boolean>(false);
  const [clubMemberPopupList, setClubMemberPopupList] = useState(USER_LIST.map(() => false));
  const [clubMemberChangeStatusModal, setClubMemberChangeStatusModal] = useState<ModalStateProps>({
    state: false,
    isOk: null,
    isLoading: false,
  });
  const [clubMemberExpelModal, setClubMemberExpelModal] = useState<ModalStateProps>({
    state: false,
    isOk: null,
    isLoading: false,
  });
  const [clubSettingPopupOpen, setClubSettingPopupOpen] = useState<boolean>(false);
  const [clubChangeDirectorModal, setClubChangeDirectorModal] = useState<ModalStateProps>({
    state: false,
    isOk: null,
    isLoading: false,
    page: 1,
  });
  const [deleteClubModal, setDeleteClubModal] = useState<ModalStateProps>({
    state: false,
    isOk: null,
    isLoading: false,
  });
  const [clubCodeModal, setClubCodeModal] = useRecoilState(generateClubCodeModal);
  const [clubCode, setClubCode] = useState<string | null>('');

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
    if (clubCode) {
      console.log(clubCodeModal.page, 'page');
      return setClubCodeModal({ state: true, page: null });
    }
    setClubCodeModal({ state: true, page: 1 });
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
      setClubMemberChangeStatusModal({ state: true, isOk: false, isLoading: false });
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
    setClubChangeDirectorModal({ state: true, isOk: null, isLoading: false, page: 1 });
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
      setClubChangeDirectorModal({ state: true, isOk: true, isLoading: false, page: 3 });
      navigate(`${MANAGE_CLUB}/change-director?step=3`);
      // fail test
      // setClubChangeDirectorModal({ state: true, isOk: false, isLoading: false, page: 3 });
    }, 1000);
  };

  // club delete modal FN
  const onClubDeleteModalOpen = () => {
    setDeleteClubModal({ state: true, isOk: null, isLoading: false });
    navigate(`${MANAGE_CLUB}/delete?step=1`);
  };

  const onDeleteClubModalClose = () => {
    setDeleteClubModal({ state: false, isOk: null, isLoading: false });
    navigate(`${MANAGE_CLUB}`);
  };

  const onDeleteClubStatusModalOpen = () => {
    setDeleteClubModal({ state: true, isOk: null, isLoading: true });
    setTimeout(() => {
      setDeleteClubModal({ state: true, isOk: true, isLoading: true });
      navigate(`${MANAGE_CLUB}/delete?step=2`);
    }, 1000);
  };

  useEffect(() => {
    navigate(`${MANAGE_CLUB}`);
    const clubCode = localStorage.getItem('club-code');
    setClubCode(clubCode);
  }, [clubCodeModal]);

  return (
    <>
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
          {Array.isArray(clubMembers?.result) &&
            clubMembers?.result?.map(({ name, freeze, borrowBook }: GetClubMembers, i) => (
              <S.DummyContainer>
                <S.ManageClubUserContainer>
                  <S.ManageClubUserIconContainer
                    onClick={() => onClubMemberInfoModalOpen('앙기모링')}
                  >
                    <S.ManageClubUserIcon />
                    <S.ManageClubUserName>{name}</S.ManageClubUserName>
                  </S.ManageClubUserIconContainer>
                  <S.ManageClubUserBookInfo onClick={() => onClubMemberInfoModalOpen('앙기모링')}>
                    {borrowBook}
                  </S.ManageClubUserBookInfo>
                  <S.ManageClubUserStatus
                    isOk={freeze === 0}
                    onClick={() => onClubMemberInfoModalOpen('앙기모링')}
                  >
                    {freeze === 0 ? '정상' : '대출정지'}
                    <br />
                    {freeze === 1 && '대여가 정지된 부원입니다.'}
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
            <S.ManageClubPopupDiv isOut={false} onClick={onClubChangeDirectorModalOpen}>
              <FaPeopleArrows size={'0.9rem'} />
              <span>부장 변경</span>
            </S.ManageClubPopupDiv>
            <S.ManageClubPopupDiv isOut={true} onClick={onClubDeleteModalOpen}>
              <FaTrash size={'0.9rem'} />
              <span>동아리 삭제</span>
            </S.ManageClubPopupDiv>
          </S.ManageClubPopupContainer>
        </div>
      </S.ManageClubWrapper>
      {clubMemberInfoModal && <ClubMemberInfoModal leftButtonClick={onClubMemberInfoModalClose} />}
      {cid && <ClubCodeModal clubId={cid} />}
      {/** club member change status modal */}
      <CommonModal
        leftButtonClick={onClubMemberChangeStatusModalClose}
        rightButtonClick={() => onClubMemberChangeStatusModalNextPage('asdf')}
        modal={clubMemberChangeStatusModal}
        title={`대여 정지 해제`}
        message={
          `정말로 부원 ‘최근원’님의 대여 정지 해제를 할까요?\n` +
          `대여 정지 해제된 부원은 자유롭게 동아리의 책을 대여할 수 있어요.`
        }
        successMessage={
          `대여 정지 해제가 완료 되었어요.\n` +
          `부원 '최근원'은 앞으로 자유롭게 동아리 도서를 대여할 수 있어요.\n` +
          `동아리 관리에서 상태를 확인해보세요.`
        }
        failMessage={
          `부원 '최근원'님의 상태 변경에 실패 했어요.\n` +
          `시스템 상의 문제로 대여 정지 해제에 실패하였어요.\n` +
          `빠른 시일내에 복구될 예정이니 잠시만 기다려주세요.`
        }
      />
      {/** club member expel modal */}
      <CommonModal
        leftButtonClick={onClubMemberExpelModalClose}
        rightButtonClick={() => onClubMemberExpelModalNextPage('asdf')}
        modal={clubMemberExpelModal}
        title={`추방`}
        message={
          `정말로 부원 ‘최근원’님을 추방할까요?\n` +
          `추방된 부원은 보안관제 동아리의 책을 대여할 수 없어요.`
        }
        successMessage={
          `부원 ‘최근원’님이 추방 되었어요.\n` +
          `부원 ‘최근원’님은 앞으로 이 동아리 도서를 대여할 수 없어요.\n` +
          `동아리 관리에서 이 부원의 상태를 확인할 수 없어요.`
        }
        failMessage={
          `부원 ‘최근원’님 추방에 실패하였어요.\n` +
          `시스템 상의 문제로 부원 추방에 실패하였어요.\n` +
          `빠른 시일내에 복구될 예정이니 잠시만 기다려주세요.`
        }
        rightButtonText={'추방'}
        isDanger={true}
      />
      <ClubChangeDirectorModal
        onClubChangeDirectorModalClose={onClubChangeDirectorModalClose}
        onClubChangeDirectorQuestionModalOpen={onClubChangeDirectorQuestionModalOpen}
        onClubChangeDirectorStatusModalOpen={onClubChangeDirectorStatusModalOpen}
        clubChangeDirectorModal={clubChangeDirectorModal}
      />
      {/** delete modal */}
      <CommonModal
        leftButtonClick={onDeleteClubModalClose}
        rightButtonClick={onDeleteClubStatusModalOpen}
        modal={deleteClubModal}
        title={'삭제'}
        isDanger={true}
        message={
          `정말로 '보안관제' 동아리를 삭제할까요?\n` +
          `삭제된 동아리의 도서는 더 이상 대여할 수 없어요.`
        }
        successMessage={
          `'보안관제' 동아리가 삭제 되었어요.\n` +
          `앞으로 '보안관제' 동아리의 도서를 대여할 수 없어요.\n` +
          `그리고 부장이었던 '최근원'님은 이제 일반 회원이 되었어요.`
        }
        failMessage={
          `'보안관제' 동아리가 삭제에 실패했어요.\n` +
          `시스템 상의 문제로 동아리 삭제에 실패하였어요.\n` +
          `빠른 시일내에 복구될 예정이니 잠시만 기다려주세요.`
        }
        rightButtonText={'삭제할게요'}
      />
    </>
  );
};
