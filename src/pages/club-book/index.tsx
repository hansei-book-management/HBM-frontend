import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useSetRecoilState } from 'recoil';

import { MANAGE_CLUB_BOOK, MANAGE_CLUB_BOOK_OPTIONS } from '@/constant';
import { Section, DetailModal, HeaderSection, AddClubBookModal } from '@/components';
import { useFetchUser, useGetClubBooks, useModal } from '@/hooks';
import { addClubBookModal } from '@/atoms';
import { BookListProps } from '@/api';

import * as S from './styled';

export interface AddBookModalStateProps {
  status: boolean;
  isOk?: boolean | null;
}

export const ManageClubBookPage: React.FC = () => {
  const { data: userData } = useFetchUser();
  const cid = userData?.result?.director?.cid;
  const { data: clubBookData, isLoading } = useGetClubBooks(cid);
  const clubBook = clubBookData?.result;

  const navigate = useNavigate();

  const { option } = useParams<{ option: string }>();
  const activeOption = MANAGE_CLUB_BOOK_OPTIONS.find(({ id }) => id === option);
  const optionValue = activeOption?.id;

  let book: BookListProps[] = [];

  if (clubBook) {
    if (activeOption?.id === 'can-rent') {
      book = clubBook?.map(({ book }) => book.filter(({ end }) => end === 0)).flat();
    } else if (activeOption?.id === 'renting') {
      book = clubBook.map(({ book }) => book.filter(({ end }) => end !== 0)).flat();
    } else {
      book = clubBook.map(({ book }) => book).flat();
    }
  } else {
    book = [];
  }

  const setAddBookModal = useSetRecoilState(addClubBookModal);

  const { modalActive } = useModal();

  const onBookDetailModalClose = () => {
    close();
    navigate(`/club-book/${optionValue}`);
  };

  const onAddBookModalOpen = () => {
    setAddBookModal({ state: true, isOk: null });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!activeOption) {
      navigate(`${MANAGE_CLUB_BOOK}/${MANAGE_CLUB_BOOK_OPTIONS[0].id}`);
    }
  }, [activeOption]);

  return (
    <>
      {isLoading ? (
        <>
          <h2>Loading...</h2>
        </>
      ) : activeOption ? (
        <S.ManageClubBookContainer>
          <HeaderSection
            name={activeOption.text}
            activeId={option}
            href={`${MANAGE_CLUB_BOOK}`}
            optionList={MANAGE_CLUB_BOOK_OPTIONS}
            onClick={onAddBookModalOpen}
          />
          <Section data={book} navigateUrl={`${MANAGE_CLUB_BOOK}/${optionValue}/book`} />
          {modalActive && (
            <DetailModal
              leftButtonText="닫기"
              data={book}
              leftButtonClick={onBookDetailModalClose}
            />
          )}
          <AddClubBookModal cid={cid} clubName={userData?.result.director?.name} />
        </S.ManageClubBookContainer>
      ) : (
        <>
          <S.ManageClubBookContainer>
            <HeaderSection
              activeId={option}
              href={`${MANAGE_CLUB_BOOK}`}
              optionList={MANAGE_CLUB_BOOK_OPTIONS}
            />
            <h1 style={{ fontSize: '1.4rem', fontWeight: 600 }}>옵션을 선택해주세요.</h1>
          </S.ManageClubBookContainer>
        </>
      )}
    </>
  );
};
