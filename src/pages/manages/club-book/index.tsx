import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import Lottie from 'react-lottie';

import { useRecoilState } from 'recoil';

import { MANAGE_CLUB_BOOK_OPTIONS, loadingLottieOptions } from '@/constant';
import { Modal, RentMessage, Section } from '@/components';
import { useModal } from '@/hooks';
import { DetailModal } from '@/components/modal/DetailModal';
import { BookState, StatusState } from '@/atoms';

import * as S from './styled';

export const ManageClubBookPage: React.FC = () => {
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { modalActive, open } = useModal();
  const [status, setStatus] = useRecoilState(StatusState);
  const [bookClick, setBookClick] = useRecoilState(BookState);

  const { option } = useParams<{ option: string }>();
  const activeOption = MANAGE_CLUB_BOOK_OPTIONS.find(({ id }) => id === option);
  const manageBookOptionsIsActive = (option?: string, id?: string) => option === id;
  const onClick = () => {
    setStatus(false);
    setBookClick(false);
    navigate(`/manage/club-book/${option}?book-add-step=1`);
    open();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!activeOption) {
      navigate(`/manage/club-book/${MANAGE_CLUB_BOOK_OPTIONS[0].id}`);
    }
  }, []);

  return (
    <S.ManageClubBookPageContainer>
      <S.ManageClubBookPageOptionList>
        {MANAGE_CLUB_BOOK_OPTIONS.map(({ name, id }) => (
          <S.ManageClubBookPageOptionItem
            to={`/manage/club-book/${id}`}
            isActive={manageBookOptionsIsActive(option, id)}
          >
            {name}
          </S.ManageClubBookPageOptionItem>
        ))}
        <S.ManageClubBookPageAddIconWrap onClick={onClick}>
          <FaPlus size={'0.9rem'} />
        </S.ManageClubBookPageAddIconWrap>
      </S.ManageClubBookPageOptionList>
      <S.ManageClubBookPageTitle>{activeOption?.text}</S.ManageClubBookPageTitle>
      <Section mangeClubName="hsoc" />
      {modalActive && !status && !bookClick && (
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
            // lastPage={true}
          />
        </Modal.OverLay>
      )}
      {modalActive && bookClick && <DetailModal message={<RentMessage canRent={true} />} />}
    </S.ManageClubBookPageContainer>
  );
};
