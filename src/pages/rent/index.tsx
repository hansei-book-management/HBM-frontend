import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useRecoilState, useSetRecoilState } from 'recoil';

import { CLUB } from '@/constant';
import { Section, DetailModal, HeaderSection, AddClubModal, CommonModal } from '@/components';
import { useGetUserClubs, useModal, useRentBook } from '@/hooks';
import { addUserClubModal, rentClubBookModal } from '@/atoms';

import * as S from './styled';

export const RentPage: React.FC = () => {
  const { data, isLoading } = useGetUserClubs();
  const userClubs = data?.result;

  const navigate = useNavigate();
  const { clubId, bookId } = useParams<{ clubId: string; bookId: string }>();

  const activeUserClub = userClubs?.find(({ name }) => name === clubId);
  const activeUserClubBooks = activeUserClub?.book;

  const { modalActive } = useModal();

  const setAddClubModal = useSetRecoilState(addUserClubModal);
  const [rentBookModal, setRentBookModal] = useRecoilState(rentClubBookModal);

  const { handleSubmit } = useForm();

  const { mutate } = useRentBook(activeUserClub?.cid, Number(bookId));

  const onSubmit = () => {
    mutate({});
  };

  // rent modal FN
  const onRentClubBookModalOpen = () => {
    setRentBookModal({ state: true, isOk: null });
  };

  const onRentClubBookModalClose = () => {
    setRentBookModal({ state: false });
    navigate(`${CLUB}/${clubId}`);
  };

  // add club modal FN
  const onBookDetailModalOpen = () => {
    setAddClubModal({ state: true, isOk: null });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!activeUserClub && userClubs && !isLoading) {
      navigate(`${CLUB}/${userClubs[0].name}`);
    }
  }, [activeUserClub, isLoading]);

  return (
    <>
      {isLoading ? (
        <>
          <h2>Loading...</h2>
        </>
      ) : activeUserClub ? (
        <>
          <S.RentPageContainer>
            <HeaderSection
              name={activeUserClub?.name}
              activeId={clubId}
              href="/club"
              list={userClubs || []}
              showPlusIcon={true}
              onClick={onBookDetailModalOpen}
            />
            <Section data={activeUserClubBooks} navigateUrl={`/club/${activeUserClub?.name}`} />
          </S.RentPageContainer>
          {/** book detail modal */}
          {modalActive && rentBookModal.state === false && (
            <DetailModal
              rightButtonClick={() => onRentClubBookModalOpen()}
              leftButtonText="닫기"
              rightButtonText="대여하기"
              data={activeUserClubBooks}
              end={activeUserClub.end}
              leftButtonClick={() => navigate(`${CLUB}/${clubId}`)}
            />
          )}
          <AddClubModal url={`${CLUB}/${clubId}`} />
          {/** rent modal */}
          <CommonModal
            leftButtonClick={onRentClubBookModalClose}
            modal={rentBookModal}
            title={`대여`}
            message={
              `정말로 이 책을 대여할까요?\n` +
              `대여가 완료된 책은 동아리 부장의 확인을 받아야 반납처리할 수 있어요.`
            }
            successMessage={
              `책 대여에 성공했어요.\n` +
              `대여 기한은 14일이며, 연장 신청을 할 수 있어요.\n` +
              `내 도서에서 확인해 보세요.`
            }
            failMessage={`책 대여에 실패 했어요.\n` + `${rentBookModal.data}`}
            handleSubmit={handleSubmit}
            onValid={onSubmit}
          />
        </>
      ) : (
        <>
          <S.RentPageContainer>
            <HeaderSection
              activeId={clubId}
              href="/club"
              list={userClubs || []}
              showPlusIcon={true}
              onClick={onBookDetailModalOpen}
            />
            <h1 style={{ fontSize: '1.4rem', fontWeight: 600 }}>동아리를 선택해주세요.</h1>
          </S.RentPageContainer>
        </>
      )}
    </>
  );
};
