import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Lottie from 'react-lottie';
import { MdLocationOff } from 'react-icons/md';

import { useRecoilState } from 'recoil';

import {
  AddClubModal,
  DetailModal,
  HeaderSection,
  Modal,
  Section,
  StatusModal,
} from '@/components';
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
  const { modalActive, open } = useModal();

  const { userClubId } = useParams<{ userClubId: string }>();
  const activeUserClub = USER_CLUB_LIST.find(({ id }) => id === userClubId);

  const USER_CLUB_BASE_URL = `/manage/user-book/${userClubId}`;

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

  const getLocationSuccess = (position: GeolocationPosition) => {
    setAllowLocation({ state: true, loading: false });
    setReturnBookModalActive({ state: true, isOk: false });
    const coords = position.coords;
    const latitude = coords.latitude;
    const longitude = coords.longitude;
    if (latitude < 37.55 || latitude > 37.56 || longitude < 126.95 || longitude > 126.96) {
      console.log('위치 정보를 사용할 수 없습니다.');
      return;
    }
    console.log(latitude, longitude);
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
      {(modalActive && !addClubModalActive.state && !returnBookModalActive.state && (
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
      )) ||
        (modalActive &&
          returnBookModalActive.state &&
          !allowLocation.state &&
          !allowLocation.loading && (
            <Modal.OverLay>
              <Modal
                textProps={
                  <S.ModalContainer>
                    <S.ModalTitle>도서 반납하기</S.ModalTitle>
                    <S.ReturnBookModalContainer>
                      <MdLocationOff size={'8rem'} color={'#828282'} />
                      <S.ReturnBookModalTitle>위치를 식별할 수 없음</S.ReturnBookModalTitle>
                      <S.ReturnBookModalMessage>
                        안전하게 반납하기 위해서 위치 권한이 필요해요. <br />
                        브라우저의 설정을 확인해 주세요.
                      </S.ReturnBookModalMessage>
                    </S.ReturnBookModalContainer>
                  </S.ModalContainer>
                }
                leftButtonText="취소"
                rightButtonText="등록"
                modalSize="medium"
                doneButtonClick={onReturnBookModalClose}
                returnBookDisable={true}
              />
            </Modal.OverLay>
          )) ||
        (modalActive &&
          returnBookModalActive.state &&
          allowLocation.state &&
          !allowLocation.loading && (
            <Modal.OverLay>
              <Modal
                textProps={
                  <S.ModalContainer>
                    <S.ModalTitle>동아리 회원 등록</S.ModalTitle>
                    <S.ModalAddClubInputContainer>
                      <S.AddClubModalInputText>인증키 입력</S.AddClubModalInputText>
                      <S.AddClubModalInput placeholder="동아리 인증키를 입력해주세요..." />
                    </S.ModalAddClubInputContainer>
                  </S.ModalContainer>
                }
                leftButtonText="취소"
                rightButtonText={
                  loading ? (
                    <Lottie options={loadingLottieOptions} height={'1.2rem'} width={'2.6rem'} />
                  ) : (
                    '등록'
                  )
                }
                modalSize="medium"
                statusDisable={loading}
                nextButtonClick={onReturnBookModalClose}
                doneButtonClick={onReturnBookModalClose}
              />
            </Modal.OverLay>
          ))}
    </S.ManageUserBookContainer>
  );
};
