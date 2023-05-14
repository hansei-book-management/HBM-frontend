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
          onNavigate={() => onNextPageNavigate(2, 1)}
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
              disable={loading}
              leftButtonText="아니요"
              rightButtonText={
                loading ? (
                  <Lottie options={loadingLottieOptions} height={'1.2rem'} width={'2.6rem'} />
                ) : (
                  '네!'
                )
              }
              {...(!loading && {
                onNavigate: () => onRentNavigate(1, 2),
                onCloseNavigate: () => onCloseNavigate(),
              })}
            />
          </Modal.OverLay>
        )) ||
        (modalActive && rentBookPage && status && <StatusModal url={`/rent/${rentClubId}`} />)}
    </S.RentPageContainer>
  );
};
