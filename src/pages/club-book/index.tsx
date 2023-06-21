import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useSetRecoilState } from 'recoil';

import { MANAGE_CLUB_BOOK, MANAGE_CLUB_BOOK_OPTIONS } from '@/constant';
import { RentMessage, Section, DetailModal, HeaderSection, AddClubBookModal } from '@/components';
import { useModal } from '@/hooks';
import { addClubBookModal } from '@/atoms';

import * as S from './styled';

export interface AddBookModalStateProps {
  status: boolean;
  isOk?: boolean | null;
}

export const ManageClubBookPage: React.FC = () => {
  const navigate = useNavigate();

  const { option } = useParams<{ option: string }>();
  const activeOption = MANAGE_CLUB_BOOK_OPTIONS.find(({ id }) => id === option);

  const setAddBookModal = useSetRecoilState(addClubBookModal);

  const { modalActive } = useModal();

  const onAddBookModalOpen = () => {
    setAddBookModal({ state: true });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!activeOption) {
      navigate(`${MANAGE_CLUB_BOOK}/${MANAGE_CLUB_BOOK_OPTIONS[0].id}`);
    }
  }, [activeOption]);

  return (
    <S.ManageClubBookContainer>
      {activeOption && (
        <HeaderSection
          name={activeOption.text}
          activeId={option}
          href={`${MANAGE_CLUB_BOOK}`}
          list={MANAGE_CLUB_BOOK_OPTIONS}
          onClick={onAddBookModalOpen}
        />
      )}
      <Section mangeClubName="hsoc" />
      {modalActive && (
        <DetailModal message={<RentMessage canRent={true} />} leftButtonText="닫기" />
      )}
      <AddClubBookModal />
    </S.ManageClubBookContainer>
  );
};
