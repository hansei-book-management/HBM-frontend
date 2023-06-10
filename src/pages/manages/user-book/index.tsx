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
import { USER_CLUB_LIST, loadingLottieOptions } from '@/constant';
import { useModal } from '@/hooks';

import * as S from './styled';

export interface ReturnBookModalStateProps extends ModalStateProps {
  allowLocation?: null | boolean;
  correctLocation?: null | boolean;
}

export interface AllowLocationStateProps {
  status: boolean;
  loading: boolean;
}

const BASE_URL = '/manage/user-book';

export const ManageUserBookPage: React.FC = () => {
  const { userClubId } = useParams<{ userClubId: string }>();
  const activeUserClub = USER_CLUB_LIST.find(({ id }) => id === userClubId);

  const USER_CLUB_BASE_URL = `/manage/user-book/${userClubId}`;

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

  useEffect(() => {
    const clubAddStep = location.search;
    window.scrollTo(0, 0);
    if (!activeUserClub || clubAddStep) {
      navigate(`${BASE_URL}/${USER_CLUB_LIST[0].id}`);
    }
  }, [activeUserClub]);

  // userMessage={`🚨 현재 3일 1시간 연체중이에요. 도서 대여가 정지될 수도 있으니 빨리 반납해 주세요.`}

  return (
    <S.ManageUserBookContainer>
      {activeUserClub && (
        <HeaderSection
          name={activeUserClub.name}
          activeId={userClubId}
          href={`${BASE_URL}`}
          list={USER_CLUB_LIST}
          manageUserBookPage={true}
          notShowPlusIcon={true}
          userBookInfo={`앙기모링님은 현재 2권 대출중이에요.`}
        />
      )}
      <Section activeClub={activeUserClub} />
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
          message={<S.DetailModalMessage isOk={true}>대여중 - 2일 1시간 남음</S.DetailModalMessage>}
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
  );
};
