import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Lottie from 'react-lottie';

import { useRecoilState } from 'recoil';

import { DetailModal, HeaderSection, Modal, Section, StatusModal } from '@/components';
import { USER_CLUB_LIST, loadingLottieOptions } from '@/constant';
import { useModal } from '@/hooks';
import { StatusState, BookState } from '@/atoms';

import * as S from './styled';

const BASE_URL = '/manage/user-book';

export const ManageUserBookPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useRecoilState(StatusState);
  const [bookClick, setBookClick] = useRecoilState(BookState);
  const { modalActive, open } = useModal();

  const { userClubId } = useParams<{ userClubId: string }>();
  const activeUserClub = USER_CLUB_LIST.find(({ id }) => id === userClubId);

  const USER_CLUB_BASE_URL = `/manage/user-book/${userClubId}`;

  const onClick = () => {
    setStatus(false);
    setBookClick(false);
    navigate(`${USER_CLUB_BASE_URL}?club-add-step=1`);
    open();
  };

  const onSubmit = (stepNum: number) => {
    navigate(`${USER_CLUB_BASE_URL}?club-add-step=${stepNum}`);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStatus(true);
    }, 1000);
  };

  const onCloseNavigate = () => {
    navigate(`${USER_CLUB_BASE_URL}`);
  };

  useEffect(() => {
    status && setStatus(false);
    const clubAddStep = location.search;
    window.scrollTo(0, 0);
    if (!activeUserClub || clubAddStep) {
      navigate(`${USER_CLUB_BASE_URL}/${USER_CLUB_LIST[0].id}`);
    }
  }, [activeUserClub]);

  return (
    <S.ManageUserBookPageContainer>
      {activeUserClub && (
        <HeaderSection
          name={activeUserClub.name}
          activeId={userClubId}
          href={`${BASE_URL}`}
          list={USER_CLUB_LIST}
          onClick={onClick}
          manageUserBookPage={true}
          userBookInfo={`앙기모링님은 현재 2권 대출중이에요.`}
          // userMessage={`🚨 현재 3일 1시간 연체중이에요. 도서 대여가 정지될 수도 있으니 빨리 반납해 주세요.`}
        />
      )}
      <Section activeClub={activeUserClub} />
      {(modalActive && !status && !bookClick && (
        <Modal.OverLay>
          <Modal
            textProps={
              <S.ModalAddClubContainer>
                <S.ModalAddClubTitle>동아리 회원 등록</S.ModalAddClubTitle>
                <S.ModalAddClubInputContainer>
                  <S.ModalAddClubInputText>인증키 입력</S.ModalAddClubInputText>
                  <S.ModalAddClubInput placeholder="동아리 인증키를 입력해주세요..." />
                </S.ModalAddClubInputContainer>
              </S.ModalAddClubContainer>
            }
            leftButtonText="취소"
            rightButtonText={
              loading ? (
                <Lottie options={loadingLottieOptions} height={'1.2rem'} width={'2.6rem'} />
              ) : (
                '등록'
              )
            }
            addModal={true}
            disable={loading}
            {...(!loading && {
              onNavigate: () => onSubmit(2),
              onCloseNavigate: () => onCloseNavigate(),
            })}
          />
        </Modal.OverLay>
      )) ||
        (modalActive && status && !bookClick && <StatusModal url={`${USER_CLUB_BASE_URL}`} />) ||
        (modalActive && bookClick && (
          <DetailModal
            leftButtonText="닫기"
            rightButtonText="반납하기"
            message={<S.ModalMessage isOk={true}>대여중 - 2일 1시간 남음</S.ModalMessage>}
          />
        ))}
    </S.ManageUserBookPageContainer>
  );
};
