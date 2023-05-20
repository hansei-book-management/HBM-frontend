import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Lottie from 'react-lottie';

import { useRecoilState } from 'recoil';

import { RENT_CLUB_LIST, loadingLottieOptions } from '@/constant';
import { Modal, RentMessage, Section, StatusModal, DetailModal, HeaderSection } from '@/components';
import { StatusState } from '@/atoms';
import { useGetLocation, useModal } from '@/hooks';

import * as S from './styled';

export const RentPage: React.FC = () => {
  const navigate = useNavigate();
  const { rentClubId } = useParams<{ rentClubId: string }>();
  const activeClub = RENT_CLUB_LIST.find(({ id }) => id === rentClubId);

  const { modalActive } = useModal();

  const { rentBookPage, rentDetailPage } = useGetLocation({ clubId: rentClubId });

  const [status, setStatus] = useRecoilState(StatusState);
  const [loading, setLoading] = useState<boolean>(false);

  const onRentNavigate = (id: number, stepNum: number) => {
    navigate(`/rent/${rentClubId}/book-rent/${id}?step=${stepNum}`);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStatus(true);
    }, 2000);
  };
  const onNextPageNavigate = (id: number, stepNum: number) => {
    navigate(`/rent/${rentClubId}/book-rent/${id}?step=${stepNum}`);
  };

  const onCloseNavigate = () => {
    navigate(`/rent/${rentClubId}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    status && setStatus(false);
    if (!activeClub) {
      navigate(`/rent/${RENT_CLUB_LIST[0].id}`);
    } else if (!modalActive) {
      navigate(`/rent/${rentClubId}`);
    }
  }, [activeClub, modalActive]);

  return (
    <S.RentPageContainer>
      {activeClub && (
        <HeaderSection
          name={activeClub.name}
          activeId={rentClubId}
          href="/rent"
          list={RENT_CLUB_LIST}
          rentPage={true}
        />
      )}
      <Section activeClub={activeClub} />
      {(modalActive && rentDetailPage && (
        <DetailModal
          nextButtonClick={() => onNextPageNavigate(2, 1)}
          leftButtonText="닫기"
          rightButtonText="대여하기"
          message={<RentMessage canRent={true} />}
        />
      )) ||
        (modalActive && rentBookPage && !status && (
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
                nextButtonClick: () => onRentNavigate(1, 2),
                doneButtonClick: () => onCloseNavigate(),
              })}
            />
          </Modal.OverLay>
        )) ||
        (modalActive && rentBookPage && status && (
          <StatusModal
            url={`/rent/${rentClubId}`}
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
