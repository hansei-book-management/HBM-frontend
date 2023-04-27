import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import Lottie from 'react-lottie';

import { useRecoilState } from 'recoil';

import { DetailModal, Modal, Section, StatusModal } from '@/components';
import { USER_CLUB_LIST, loadingLottieOptions } from '@/constant';
import { useModal } from '@/hooks';
import { StatusState, BookState } from '@/atoms';

import * as S from './styled';

export const ManageUserBookPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useRecoilState(StatusState);
  const [bookClick, setBookClick] = useRecoilState(BookState);
  const { modalActive, open } = useModal();

  const { userClubId } = useParams<{ userClubId: string }>();
  const activeUserClub = USER_CLUB_LIST.find(({ id }) => id === userClubId);

  const userClubIsActive = (userClubId?: string, id?: string) => userClubId === id;

  const onClick = () => {
    setStatus(false);
    setBookClick(false);
    navigate(`/manage/user-book/${userClubId}?club-add-step=1`);
    open();
  };

  const onSubmit = (stepNum: number) => {
    navigate(`/manage/user-book/${userClubId}?club-add-step=${stepNum}`);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStatus(true);
    }, 1000);
  };

  const onCloseNavigate = () => {
    navigate(`/manage/user-book/${userClubId}`);
  };

  useEffect(() => {
    status && setStatus(false);
    window.scrollTo(0, 0);
    if (!activeUserClub) {
      navigate(`/manage/user-book/${USER_CLUB_LIST[0].id}`);
    }
  }, [activeUserClub]);

  return (
    <S.ManageUserBookPageContainer>
      {/* <S.ManageMessage>
        현재 3일 1시간 연체중이에요. 도서 대여가 정지될 수도 있으니 빨리 반납해 주세요.
      </S.ManageMessage> */}
      <S.ManageUserBookPageSubTitle>
        앙기모링님은 현재 2권 대출중이에요.
      </S.ManageUserBookPageSubTitle>
      <S.ManageUserBookPageTitle>대출 중인 {activeUserClub?.name} 도서</S.ManageUserBookPageTitle>
      <S.UserClubList>
        {USER_CLUB_LIST.map(({ name, id }) => (
          <S.UserClubLink
            key={id}
            to={`/manage/user-book/${id}`}
            isActive={userClubIsActive(userClubId, id)}
          >
            {name}
          </S.UserClubLink>
        ))}
        <S.ClubAddIconWrap onClick={onClick}>
          <FaPlus size={'0.9rem'} />
        </S.ClubAddIconWrap>
      </S.UserClubList>
      <Section activeClub={activeUserClub} />
      {(modalActive && !status && !bookClick && (
        <Modal.OverLay>
          <Modal
            textProps={
              <S.ModalAddClubContainer>
                <S.ModalAddClubTitle>동아리 회원 등록</S.ModalAddClubTitle>
                <S.ModalAddClubInputContainer>
                  <S.ModalAddClubInputText>인증키 입력</S.ModalAddClubInputText>
                  <S.ModalAddClubInput />
                </S.ModalAddClubInputContainer>
              </S.ModalAddClubContainer>
            }
            leftButtonText="취소"
            rightButtonText={
              loading ? (
                <Lottie options={loadingLottieOptions} height={'1.2rem'} width={'2.6rem'} />
              ) : (
                '추가하기'
              )
            }
            lastPage={true}
            clubAddModal={true}
            disable={loading}
            {...(!loading && {
              onNavigate: () => onSubmit(2),
              onCloseNavigate: () => onCloseNavigate(),
            })}
          />
        </Modal.OverLay>
      )) ||
        (modalActive && status && !bookClick && (
          <StatusModal url={`/manage/user-book/${userClubId}`} />
        )) ||
        (modalActive && bookClick && (
          <DetailModal
            message={<S.ModalMessage isOk={true}>대여중 - 2일 1시간 남음</S.ModalMessage>}
          />
        ))}
    </S.ManageUserBookPageContainer>
  );
};
