import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useSetRecoilState } from 'recoil';

import { CLUB, USER_CLUB_LIST } from '@/constant';
import {
  RentMessage,
  Section,
  DetailModal,
  HeaderSection,
  AddClubModal,
  ModalStateProps,
  CommonModal,
} from '@/components';
import { useModal } from '@/hooks';
import { addUserClubModal } from '@/atoms';

import * as S from './styled';

export const RentPage: React.FC = () => {
  // here have to fetch book api
  const navigate = useNavigate();
  const { clubId } = useParams<{ clubId: string }>();
  const activeClub = USER_CLUB_LIST.find(({ id }) => id === clubId);

  const { modalActive } = useModal();

  // const [addClubModal, setAddClubModal] = useState<ModalStateProps>({
  //   state: false,
  //   isLoading: false,
  //   isOk: null,
  // });

  const [rentClubBookModal, setRentClubBookModal] = useState<ModalStateProps>({
    state: false,
    isLoading: false,
    isOk: null,
  });

  const setAddClubModal = useSetRecoilState(addUserClubModal);

  // rent modal FN
  const onRentClubBookModalOpen = (bookId: number) => {
    setRentClubBookModal({ state: true, isLoading: false, isOk: null });
    navigate(`${CLUB}/${clubId}/book/${bookId}/book-rent?step=1`);
  };

  const onRentClubBookStateModal = (bookId: number) => {
    setRentClubBookModal({ state: true, isLoading: true, isOk: null });
    setTimeout(() => {
      setRentClubBookModal({ state: true, isLoading: false, isOk: true });
      navigate(`${CLUB}/${clubId}/book/${bookId}/book-rent?step=2`);
      // fail test
      // setRentClubBookModal({ state: true, isLoading: false, isOk: false });
    }, 1000);
  };

  const onRentClubBookModalClose = () => {
    setRentClubBookModal({ state: false, isLoading: false, isOk: null });
    navigate(`${CLUB}/${clubId}`);
  };

  // add club modal FN
  const onAddClubModalOpen = () => {
    setAddClubModal({ state: true, isOk: null });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!activeClub) {
      navigate(`${CLUB}/${USER_CLUB_LIST[0].id}`);
    } else if (!modalActive) {
      navigate(`${CLUB}/${clubId}`);
    }
  }, [activeClub, modalActive]);

  return (
    <>
      <S.RentPageContainer>
        {activeClub && (
          <HeaderSection
            name={activeClub.name}
            activeId={clubId}
            href="/club"
            list={USER_CLUB_LIST}
            onClick={onAddClubModalOpen}
          />
        )}
        <Section activeClub={activeClub} />
      </S.RentPageContainer>
      {/** book detail modal */}
      {modalActive && !rentClubBookModal.state && (
        <DetailModal
          rightButtonClick={() => onRentClubBookModalOpen(1)}
          leftButtonText="닫기"
          rightButtonText="대여하기"
          message={<RentMessage canRent={true} />}
        />
      )}
      <AddClubModal url={`${CLUB}/${clubId}`} />
      {/** rent modal */}
      <CommonModal
        leftButtonClick={onRentClubBookModalClose}
        rightButtonClick={() => onRentClubBookStateModal(1)}
        modal={rentClubBookModal}
        title={`대여`}
        message={
          `정말로 ‘당신이 모르는 민주주의’ 책을 대여할까요?\n` +
          `대여가 완료된 책은 동아리 부장의 확인을 받아야 반납처리할 수 있어요.`
        }
        successMessage={
          `‘당신이 모르는 민주주의’ 책을 대여했어요.\n` +
          `대여 기한은 10일이며, 연장 신청을 할 수 있어요.\n` +
          `1차 반납 기간은 2023년 X월 X일까지에요.`
        }
        failMessage={
          `'앙기모링'님의 대여 실패 했어요.\n` +
          `대여한 도서를 기간 내에 반납하지 않아 대여가 정지되었어요.\n` +
          `대여 정지는 도서 반납을 하면 자동으로 해제돼요.`
        }
      />
    </>
  );
};
