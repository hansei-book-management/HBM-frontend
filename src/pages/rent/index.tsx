import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Lottie from 'react-lottie';

import { useRecoilState } from 'recoil';

import { RENT_CLUB_LIST, checkLottieOptions, loadingLottieOptions } from '@/constant';
import { Modal, Section } from '@/components';
import { useModal } from '@/hooks/useModal';
import { StatusState } from '@/atoms';
import { DetailModal } from '@/components/modal/DetailModal';
import { useGetLocation } from '@/hooks';

import * as S from './styled';

const clubLinkIsActive = (clubId?: string, id?: string) => clubId === id;

export const RentPage: React.FC = () => {
  const navigate = useNavigate();
  const { rentClubId } = useParams<{ rentClubId: string }>();
  const activeClub = RENT_CLUB_LIST.find(({ id }) => id === rentClubId);

  const { modalActive } = useModal();

  const { rentBookPage, rentDetailPage } = useGetLocation({ clubId: rentClubId });

  const [status, setStatus] = useRecoilState(StatusState);
  const [loading, setLoading] = useState<boolean>(false);

  const onRentNavigate = (id: number) => {
    navigate(`/rent/${rentClubId}/book-rent/${id}`);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStatus(true);
    }, 1000);
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
      <S.TeamList>
        {RENT_CLUB_LIST.map(({ name, id }) => (
          <S.TeamLink to={`/rent/${id}`} isActive={clubLinkIsActive(rentClubId, id)}>
            {name}
          </S.TeamLink>
        ))}
      </S.TeamList>
      {activeClub && <S.RentPageTitle>{activeClub.name} 도서</S.RentPageTitle>}
      <Section activeClub={activeClub} />
      {(modalActive && rentDetailPage && <DetailModal clubId={rentClubId} />) ||
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
                onNavigate: () => onRentNavigate(2),
                onCloseNavigate: () => onCloseNavigate(),
              })}
            />
          </Modal.OverLay>
        )) ||
        (modalActive && rentBookPage && status && (
          <Modal.OverLay>
            <Modal
              textProps={
                <S.ModalSuccessContainer>
                  <Lottie options={checkLottieOptions} height={'8rem'} width={'8rem'} />
                  <S.ModalTitle>대출 성공</S.ModalTitle>
                  <S.ModalLastContainer>
                    <S.ModalSubTitle>‘당신이 모르는 민주주의’ 책을 대여했어요.</S.ModalSubTitle>
                    <S.ModalSubTitle>
                      대출 기한은 10일이며, 연장 신청을 할 수 있어요.
                    </S.ModalSubTitle>
                    <S.ModalSubTitle>1차 반납 기간은 2023년 X월 X일까지에요.</S.ModalSubTitle>
                  </S.ModalLastContainer>
                </S.ModalSuccessContainer>
              }
              leftButtonText="확인했어요"
              rightButtonText="확인했어요"
              onCloseNavigate={() => onCloseNavigate()}
              lastPage={true}
            />
          </Modal.OverLay>
        ))}
    </S.RentPageContainer>
  );
};
