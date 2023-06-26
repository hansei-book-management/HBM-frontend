import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Lottie from 'react-lottie';

import { useRecoilState } from 'recoil';

import {
  DetailModal,
  HeaderSection,
  ModalStateProps,
  NoDataMessage,
  ReturnBookModal,
  Section,
} from '@/components';
import { loadingLottieOptions } from '@/constant';
import { useFetchUser, useGetUserBooks, useModal } from '@/hooks';
import { returnClubBookModal } from '@/atoms';

import * as S from './styled';

export interface ReturnBookModalStateProps extends ModalStateProps {
  allowLocation?: null | boolean;
  correctLocation?: null | boolean;
  image?: null | string;
}

export interface AllowLocationStateProps {
  status: boolean;
  loading: boolean;
}

const BASE_URL = '/user-book';

export const ManageUserBookPage: React.FC = () => {
  const { data: userData } = useFetchUser();
  const user = userData?.result;
  const { data: userBook, isLoading } = useGetUserBooks(user?.uid);
  const userClubBook = userBook?.result;
  const isUserBookExits = userClubBook && userClubBook.length > 0;

  const { clubId } = useParams<{ clubId: string }>();
  const activeUserClub = userClubBook?.find(({ name }) => name === clubId);
  const userBookData = activeUserClub?.book;
  const USER_CLUB_BASE_URL = `/user-book/${clubId}`;

  const navigate = useNavigate();

  const [returnBookModal, setReturnBookModal] = useRecoilState(returnClubBookModal);
  const { modalActive } = useModal();

  // return book modal FN
  const getLocationSuccess = (position: GeolocationPosition) => {
    setReturnBookModal({ state: true, allowLocation: true });
    const coords = position.coords;
    const latitude = coords.latitude;
    const longitude = coords.longitude;
    if (latitude < 37.56 && latitude > 37.55 && longitude < 126.96 && longitude > 126.95) {
      setReturnBookModal({ state: true, correctLocation: true });
    } else {
      setReturnBookModal({ state: true, correctLocation: false });
    }
  };

  const getLocationFail = () => {
    setReturnBookModal({ state: true, allowLocation: false });
  };

  const onReturnBookModalOpen = () => {
    setReturnBookModal({ state: false, isLoading: true });
    const { geolocation } = navigator;

    if (!geolocation) {
      getLocationFail();
    }

    geolocation.getCurrentPosition(
      (position) => {
        getLocationSuccess(position);
      },
      () => {
        getLocationFail();
      },
    );
  };

  const bookCount = userClubBook
    ?.map(({ book }) => book.filter(({ end }) => end !== 0).length)
    .reduce((a, b) => a + b, 0);

  useEffect(() => {
    const clubAddStep = location.search;
    window.scrollTo(0, 0);
    if (
      (!activeUserClub && userClubBook && !isLoading && isUserBookExits) ||
      (userClubBook && !isLoading && isUserBookExits && clubAddStep)
    ) {
      navigate(`${BASE_URL}/${userClubBook[0].name}`);
    }
  }, [activeUserClub, isLoading]);

  return (
    <>
      {isLoading ? (
        <>
          <h2>Loading...</h2>
        </>
      ) : bookCount && bookCount > 0 && isUserBookExits && activeUserClub ? (
        <S.ManageUserBookContainer>
          <HeaderSection
            name={activeUserClub?.name}
            activeId={clubId}
            href={`${BASE_URL}`}
            list={userClubBook || []}
            manageUserBookPage={true}
            userBookInfo={`${user?.name}은 현재 ${bookCount}권 대여중이에요.`}
          />
          <Section
            data={userBookData?.filter(({ end }) => end !== 0)}
            navigateUrl={`/user-book/${activeUserClub?.name}/book`}
          />
          {modalActive && !returnBookModal.state && (
            <DetailModal
              leftButtonText="닫기"
              rightButtonText={
                returnBookModal.isLoading ? (
                  <Lottie options={loadingLottieOptions} height={'1.2rem'} width={'2.6rem'} />
                ) : (
                  '반납하기'
                )
              }
              data={userBookData}
              rightButtonClick={onReturnBookModalOpen}
              leftButtonClick={() => navigate(`${BASE_URL}/${clubId}`)}
            />
          )}
          <ReturnBookModal cid={activeUserClub?.cid} url={USER_CLUB_BASE_URL} uid={user?.uid} />
        </S.ManageUserBookContainer>
      ) : (
        <>
          <NoDataMessage
            message={`대여중인 도서가 없어요.\n` + `지금 바로 도서를 대여하러 가볼까요?`}
            btnLink="/club"
            btnMessage="도서 대여 바로가기"
          />
        </>
      )}
    </>
  );
};
