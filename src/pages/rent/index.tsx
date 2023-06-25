import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useRecoilState, useSetRecoilState } from 'recoil';

import { CLUB } from '@/constant';
import {
  Section,
  DetailModal,
  HeaderSection,
  AddClubModal,
  CommonModal,
  Button,
} from '@/components';
import { useFetchUser, useGetUserClubs, useModal, useRentBook } from '@/hooks';
import { addUserClubModal, rentClubBookModal } from '@/atoms';

import * as S from './styled';

export const RentPage: React.FC = () => {
  const { data: userData } = useFetchUser();
  const user = userData?.result;
  const { data, isLoading } = useGetUserClubs();
  const userClubs = data?.result;
  const isUserClubExits = userClubs && userClubs.length > 0;

  const navigate = useNavigate();
  const { clubId, bookId } = useParams<{ clubId: string; bookId: string }>();

  const activeUserClub = userClubs?.find(({ name }) => name === clubId);
  const activeUserClubBooks = activeUserClub?.book;

  const { modalActive, close } = useModal();

  const setAddClubModal = useSetRecoilState(addUserClubModal);
  const [rentBookModal, setRentBookModal] = useRecoilState(rentClubBookModal);

  const { handleSubmit } = useForm();

  const { mutate } = useRentBook({ uid: user?.uid });

  const onSubmit = () => {
    mutate({ cid: activeUserClub?.cid, bid: Number(bookId) });
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
  const onAddClubModalOpen = () => {
    setAddClubModal({ state: true, isOk: null });
  };

  const onBookDetailModalClose = () => {
    close();
    navigate(`${CLUB}/${clubId}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!activeUserClub && isUserClubExits && userClubs && !isLoading) {
      navigate(`${CLUB}/${userClubs[0].name}`);
    }
  }, [activeUserClub, isLoading]);

  return (
    <>
      {isLoading ? (
        <>
          <h2>Loading...</h2>
        </>
      ) : isUserClubExits && activeUserClub ? (
        <>
          <S.RentPageContainer>
            <HeaderSection
              name={activeUserClub?.name}
              activeId={clubId}
              href="/club"
              list={userClubs || []}
              showPlusIcon={true}
              onClick={onAddClubModalOpen}
            />
            <Section data={activeUserClubBooks} navigateUrl={`/club/${activeUserClub?.name}`} />
          </S.RentPageContainer>
          {/** book detail modal */}
          {modalActive && rentBookModal.state === false && (
            <DetailModal
              rentPage={true}
              rightButtonClick={() => onRentClubBookModalOpen()}
              leftButtonText="닫기"
              rightButtonText="대여하기"
              data={activeUserClubBooks}
              leftButtonClick={() => onBookDetailModalClose()}
            />
          )}
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
            failMessage={
              `책 대여에 실패 했어요.\n` +
              `${rentBookModal.data}` +
              `위의 문제로 인해 책 대여에 실패하였어요.`
            }
            handleSubmit={handleSubmit}
            onValid={onSubmit}
          />
        </>
      ) : (
        <>
          <S.RentPageContainer noData={true}>
            <S.NoDataMessageWrapper>
              <h1
                style={{
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  textAlign: 'center',
                }}
              >
                가입된 동아리가 없어요. <br />
                아래 버튼을 눌러 동아리를 추가해보세요.
              </h1>
              <Button to="/club" description="동아리 추가하기" onClick={onAddClubModalOpen} />
            </S.NoDataMessageWrapper>
          </S.RentPageContainer>
        </>
      )}
      <AddClubModal url={`${CLUB}${clubId ? '/' + clubId : ''}`} />
    </>
  );
};
