import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Lottie from 'react-lottie';

import { useRecoilState } from 'recoil';

import { CLUB, USER_CLUB_LIST, loadingLottieOptions } from '@/constant';
import {
  Modal,
  RentMessage,
  Section,
  StatusModal,
  DetailModal,
  HeaderSection,
  AddClubModal,
} from '@/components';
import { AddClubState, StatusState } from '@/atoms';
import { useGetLocation, useModal } from '@/hooks';

import * as S from './styled';

export const RentPage: React.FC = () => {
  // here have to fetch book api
  const navigate = useNavigate();
  const { clubId } = useParams<{ clubId: string }>();
  const activeClub = USER_CLUB_LIST.find(({ id }) => id === clubId);

  const [addClubModalActive, setAddClubModalActive] = useRecoilState(AddClubState);

  const { modalActive } = useModal();

  const { clubBookRentPage, clubBookDetailPage } = useGetLocation({ clubId: clubId, bookId: 1 });

  const [status, setStatus] = useRecoilState(StatusState);
  const [loading, setLoading] = useState<boolean>(false);

  // rent modal FN
  const onNextPageNavigate = (bookId: number, stepNum: number) => {
    navigate(`${CLUB}/${clubId}/book/${bookId}/book-rent?step=${stepNum}`);
  };

  const onRentNavigate = (bookId: number, stepNum: number) => {
    navigate(`${CLUB}/${clubId}/book/${bookId}/book-rent?step=${stepNum}`);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStatus(false);
    }, 2000);
  };

  const onCloseNavigate = () => {
    navigate(`${CLUB}/${clubId}`);
  };

  // add club modal FN
  const onAddClubModalOpen = () => {
    setAddClubModalActive({ state: true, isOk: false });
    navigate(`${CLUB}/${clubId}/club-add?step=1`);
  };

  const onAddClubModalSubmit = (stepNum: number) => {
    navigate(`${CLUB}/${clubId}/club-add?step=${stepNum}`);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setAddClubModalActive({ state: true, isOk: true });
    }, 1000);
  };

  const onAddClubModalClose = () => {
    setAddClubModalActive({ state: false, isOk: false });
    onCloseNavigate();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    status && setStatus(false);
    if (!activeClub) {
      navigate(`${CLUB}/${USER_CLUB_LIST[0].id}`);
    } else if (!modalActive) {
      navigate(`${CLUB}/${clubId}`);
    }
  }, [activeClub, modalActive, clubBookDetailPage]);

  return (
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
      <AddClubModal
        addClubModalActive={addClubModalActive}
        nextButtonClick={() => onAddClubModalSubmit(2)}
        doneButtonClick={() => onAddClubModalClose()}
        loading={loading}
        url={`${CLUB}/${clubId}`}
      />
      {(modalActive && clubBookDetailPage && !addClubModalActive.state && (
        <DetailModal
          nextButtonClick={() => onNextPageNavigate(1, 1)}
          leftButtonText="닫기"
          rightButtonText="대여하기"
          message={<RentMessage canRent={true} />}
        />
      )) ||
        (modalActive && clubBookRentPage && !status && (
          <Modal.OverLay>
            <Modal
              textProps={
                <S.ModalQuestionContainer>
                  <S.ModalTitle>대여 진행</S.ModalTitle>
                  <S.ModalSubTitle>
                    정말로 ‘당신이 모르는 민주주의’ 책을 대여할까요?
                    <br />
                    대여가 완료된 책은 동아리 부장의 확인을 받아야 반납처리할 수 있어요.
                  </S.ModalSubTitle>
                </S.ModalQuestionContainer>
              }
              statusDisable={loading}
              leftButtonText="아니요"
              rightButtonText={
                loading ? (
                  <Lottie options={loadingLottieOptions} height={'1.2rem'} width={'2.6rem'} />
                ) : (
                  '네!'
                )
              }
              modalSize="large"
              {...(!loading && {
                rightButtonClick: () => onRentNavigate(1, 2),
                leftButtonClick: () => onCloseNavigate(),
              })}
            />
          </Modal.OverLay>
        )) ||
        (modalActive && clubBookRentPage && status && (
          <StatusModal
            url={`/club/${clubId}`}
            {...(status
              ? {
                  title: '대여 성공',
                  isOk: true,
                  message: (
                    <>
                      <S.StatusModalText>
                        ‘당신이 모르는 민주주의’ 책을 대여했어요.
                        <br />
                        대출 기한은 10일이며, 연장 신청을 할 수 있어요.
                        <br />
                        1차 반납 기간은 2023년 X월 X일까지에요.
                      </S.StatusModalText>
                    </>
                  ),
                }
              : {
                  title: '대여 성공',
                  isOk: true,
                  message: (
                    <>
                      <S.StatusModalText>
                        대출한 도서를 기간 내에 반납하지 않아 대여가 정지되었어요.
                        <br />
                        대출 정지는 10일 5시간 후 자동으로 해제돼요.
                      </S.StatusModalText>
                    </>
                  ),
                })}
          />
        ))}
    </S.RentPageContainer>
  );
};
