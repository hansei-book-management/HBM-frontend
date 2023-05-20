import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Lottie from 'react-lottie';

import { useRecoilState } from 'recoil';

import { AddClubModal, DetailModal, HeaderSection, ReturnBookModal, Section } from '@/components';
import { USER_CLUB_LIST, loadingLottieOptions } from '@/constant';
import { useModal } from '@/hooks';
import { AddClubState } from '@/atoms';

import * as S from './styled';

const BASE_URL = '/manage/user-book';

export const ManageUserBookPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [addClubModalActive, setAddClubModalActive] = useRecoilState(AddClubState);
  const [returnBookModalActive, setReturnBookModalActive] = useState({ state: false, isOk: false });
  const [allowLocation, setAllowLocation] = useState({
    state: false,
    loading: false,
  });
  const [correctLocation, setCorrectLocation] = useState<boolean>(false);
  const { modalActive, open, close } = useModal();

  const { userClubId } = useParams<{ userClubId: string }>();
  const activeUserClub = USER_CLUB_LIST.find(({ id }) => id === userClubId);

  const USER_CLUB_BASE_URL = `/manage/user-book/${userClubId}`;

  // add club modal FN
  const onAddClubModalOpen = () => {
    setAddClubModalActive({ state: true, isOk: false });
    navigate(`${USER_CLUB_BASE_URL}?club-add-step=1`);
    open();
  };

  const onAddClubModalClose = () => {
    setAddClubModalActive({ state: true, isOk: false });
    navigate(`${USER_CLUB_BASE_URL}`);
  };

  const onAddClubModalSubmit = (stepNum: number) => {
    navigate(`${USER_CLUB_BASE_URL}?club-add-step=${stepNum}`);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setAddClubModalActive({ state: true, isOk: true });
    }, 1000);
  };

  // return book modal FN
  const getLocationSuccess = (position: GeolocationPosition) => {
    setAllowLocation({ state: true, loading: false });
    setReturnBookModalActive({ state: true, isOk: false });
    const coords = position.coords;
    const latitude = coords.latitude;
    const longitude = coords.longitude;
    if (latitude < 37.56 && latitude > 37.55 && longitude < 126.96 && longitude > 126.95) {
      setCorrectLocation(false);
      console.log(latitude, longitude);
    }
    setCorrectLocation(true);
  };

  const getLocationFail = () => {
    setAllowLocation({ state: false, loading: false });
    setReturnBookModalActive({ state: true, isOk: false });
  };

  const onReturnBookModalOpen = () => {
    setAllowLocation({ state: false, loading: true });
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
    close();
    setReturnBookModalActive({ state: false, isOk: false });
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
          onClick={onAddClubModalOpen}
          manageUserBookPage={true}
          userBookInfo={`앙기모링님은 현재 2권 대출중이에요.`}
        />
      )}
      <Section activeClub={activeUserClub} />
      <AddClubModal
        modalActive={modalActive}
        addClubModalActive={addClubModalActive}
        nextButtonClick={() => onAddClubModalSubmit(2)}
        doneButtonClick={() => onAddClubModalClose()}
        loading={loading}
        url={USER_CLUB_BASE_URL}
      />
      {modalActive && !addClubModalActive.state && !returnBookModalActive.state && (
        <DetailModal
          leftButtonText="닫기"
          rightButtonText={
            allowLocation.loading ? (
              <Lottie options={loadingLottieOptions} height={'1.2rem'} width={'2.6rem'} />
            ) : (
              '반납하기'
            )
          }
          message={<S.DetailModalMessage isOk={true}>대여중 - 2일 1시간 남음</S.DetailModalMessage>}
          nextButtonClick={onReturnBookModalOpen}
        />
      )}
      <ReturnBookModal
        modalActive={modalActive}
        returnBookModalActive={returnBookModalActive}
        allowLocation={allowLocation}
        doneButtonClick={onReturnBookModalClose}
        nextButtonClick={onReturnBookModalClose}
        correctLocation={correctLocation}
      />
    </S.ManageUserBookContainer>
  );
};
