import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Lottie from 'react-lottie';

import {
  DetailModal,
  HeaderSection,
  ModalStateProps,
  ReturnBookModal,
  Section,
} from '@/components';
import { loadingLottieOptions } from '@/constant';
import { useFetchUser, useGetUserBooks, useModal } from '@/hooks';

import * as S from './styled';

export interface ReturnBookModalStateProps extends ModalStateProps {
  allowLocation?: null | boolean;
  correctLocation?: null | boolean;
}

export interface AllowLocationStateProps {
  status: boolean;
  loading: boolean;
}

const BASE_URL = '/user-book';

export const ManageUserBookPage: React.FC = () => {
  const { data: userData } = useFetchUser();
  const user = userData?.result;
  const { data: userBook, isFetching } = useGetUserBooks(user?.uid);
  const userClubBook = userBook?.result;

  const { clubId } = useParams<{ clubId: string }>();
  const activeUserClub = userClubBook?.find(({ name }) => name === clubId);
  const userBookData = activeUserClub?.book;
  const USER_CLUB_BASE_URL = `/user-book/${clubId}`;

  const navigate = useNavigate();

  const [returnBookModal, setReturnBookModal] = useState<ReturnBookModalStateProps>({
    state: false,
    isOk: null,
    isLoading: false,
    allowLocation: null,
    correctLocation: null,
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { modalActive } = useModal();

  // return book modal FN
  const getLocationSuccess = (position: GeolocationPosition) => {
    setReturnBookModal({ state: true, allowLocation: true });
    const coords = position.coords;
    const latitude = coords.latitude;
    const longitude = coords.longitude;
    if (latitude < 37.56 && latitude > 37.55 && longitude < 126.96 && longitude > 126.95) {
      setReturnBookModal({ state: true, correctLocation: false });
    }
    setReturnBookModal({ state: true, correctLocation: true });
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

  const onReturnBookModalClose = () => {
    setSelectedImage(null);
    setReturnBookModal({ state: false });
  };

  const onReturnBookStatusModal = () => {
    setReturnBookModal({ state: true, isLoading: true, correctLocation: true });
    setTimeout(() => {
      setReturnBookModal({ state: true, isOk: true, isLoading: false });
      // fail test
      // setReturnBookModal({ state: true,  isOk: false, isLoading: false, });
    }, 1000);
  };

  const bookCount = userClubBook
    ?.map(({ book }) => book.filter(({ end }) => end === 0).length)
    .reduce((a, b) => a + b, 0);

  useEffect(() => {
    const clubAddStep = location.search;
    window.scrollTo(0, 0);
    if (!activeUserClub && userClubBook && clubAddStep && !isFetching) {
      navigate(`${BASE_URL}/${userClubBook[0].name}`);
    }
  }, [activeUserClub]);

  // userMessage={`🚨 현재 3일 1시간 연체중이에요. 도서 대여가 정지될 수도 있으니 빨리 반납해 주세요.`}

  return (
    <>
      {isFetching ? null : activeUserClub ? (
        <S.ManageUserBookContainer>
          <HeaderSection
            name={activeUserClub?.name}
            activeId={clubId}
            href={`${BASE_URL}`}
            list={userClubBook || []}
            manageUserBookPage={true}
            notShowPlusIcon={true}
            userBookInfo={`${user?.name}은 현재 ${bookCount}권 대출중이에요.`}
          />
          <Section data={userBookData} navigateUrl={`/user-book/${activeUserClub.name}/book`} />
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
            />
          )}
          <ReturnBookModal
            returnBookModal={returnBookModal}
            onReturnBookModalClose={onReturnBookModalClose}
            onReturnBookStatusModal={onReturnBookStatusModal}
            setSelectedImage={setSelectedImage}
            selectedImage={selectedImage}
            url={USER_CLUB_BASE_URL}
          />
        </S.ManageUserBookContainer>
      ) : (
        <>
          <S.ManageUserBookContainer>
            <HeaderSection activeId={clubId} href={`${BASE_URL}`} list={userClubBook || []} />
            <h1 style={{ fontSize: '1.4rem', fontWeight: 600 }}>동아리를 선택해주세요.</h1>
          </S.ManageUserBookContainer>
        </>
      )}
    </>
  );
};
