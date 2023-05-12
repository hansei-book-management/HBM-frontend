import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Lottie from 'react-lottie';

import { useRecoilState } from 'recoil';

import { MANAGE_CLUB_BOOK_OPTIONS, loadingLottieOptions } from '@/constant';
import { Modal, RentMessage, Section, StatusModal, DetailModal, HeaderSection } from '@/components';
import { useModal } from '@/hooks';
import { BookState, StatusState } from '@/atoms';

import * as S from './styled';

const BASE_URL = '/manage/club-book';

export const ManageClubBookPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { modalActive, open } = useModal();
  const [status, setStatus] = useRecoilState(StatusState);
  const [bookClick, setBookClick] = useRecoilState(BookState);

  const { option } = useParams<{ option: string }>();
  const activeOption = MANAGE_CLUB_BOOK_OPTIONS.find(({ id }) => id === option);
  const onClick = () => {
    navigate(`${BASE_URL}/${option}?book-add-step=1`);
    setStatus(false);
    setBookClick(false);
    open();
  };

  const onSubmit = () => {
    navigate(`${BASE_URL}/${option}?book-add-step=2`);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStatus(true);
    }, 1000);
  };

  const onCloseNavigate = () => {
    navigate(`${BASE_URL}`);
  };

  useEffect(() => {
    status && setStatus(false);
    window.scrollTo(0, 0);
    if (!activeOption) {
      navigate(`${BASE_URL}/${MANAGE_CLUB_BOOK_OPTIONS[0].id}`);
    }
  }, [activeOption]);

  return (
    <S.ManageClubBookPageContainer>
      {activeOption && (
        <HeaderSection
          name={activeOption.text}
          activeId={option}
          href={`${BASE_URL}`}
          list={MANAGE_CLUB_BOOK_OPTIONS}
          onClick={onClick}
        />
      )}
      <Section mangeClubName="hsoc" />
      {modalActive && !status && !bookClick && (
        <Modal.OverLay>
          <Modal
            textProps={
              <S.ModalAddBookContainer>
                <S.ModalAddBookTitle>책 추가하기</S.ModalAddBookTitle>
                <S.ModalAddBookInputContainer>
                  <S.ModalAddBookInputText>제목 입력</S.ModalAddBookInputText>
                  <S.ModalAddBookInput placeholder="책 제목을 입력해주세요..." />
                </S.ModalAddBookInputContainer>
                <S.ModalAddBookInputContainer>
                  <S.ModalAddBookInputText>작가 입력</S.ModalAddBookInputText>
                  <S.ModalAddBookInput placeholder="책의 작가를 입력해주세요..." />
                </S.ModalAddBookInputContainer>
                <S.ModalAddBookInputContainer>
                  <S.ModalAddBookInputText>출판사 입력</S.ModalAddBookInputText>
                  <S.ModalAddBookInput placeholder="책의 출판사를 입력해주세요..." />
                </S.ModalAddBookInputContainer>
              </S.ModalAddBookContainer>
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
              onNavigate: () => onSubmit(),
              onCloseNavigate: () => onCloseNavigate(),
            })}
          />
        </Modal.OverLay>
      )}
      {modalActive && status && !bookClick && <StatusModal url={`${BASE_URL}`} />}
      {modalActive && bookClick && <DetailModal message={<RentMessage canRent={true} />} />}
    </S.ManageClubBookPageContainer>
  );
};
