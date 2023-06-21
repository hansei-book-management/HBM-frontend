import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { DetailModal, HeaderSection, Section } from '@/components';
import { useGetClubs, useModal } from '@/hooks';

import * as S from './styled';

export const BookPage: React.FC = () => {
  const { data } = useGetClubs();
  const clubs = data?.result;

  const { clubId } = useParams<{ clubId: string }>();
  const activeClub = clubs?.find(({ name }) => name === clubId);

  const { modalActive, close } = useModal();

  const navigate = useNavigate();

  const onBookDetailModalClose = () => {
    close();
    navigate(`/book/${clubId}`);
  };

  const activeClubBooks = activeClub?.book;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!activeClub) {
      navigate(`/book/${clubId}`);
    }
  }, [activeClub]);

  return (
    <S.BookPageContainer>
      <HeaderSection
        name={activeClub?.name}
        activeId={clubId}
        href="/book"
        list={clubs || []}
        notShowPlusIcon={true}
      />
      <Section data={activeClubBooks} clubName={activeClub?.name} />
      {modalActive && (
        <DetailModal
          data={activeClubBooks}
          leftButtonText="닫기"
          leftButtonClick={onBookDetailModalClose}
        />
      )}
    </S.BookPageContainer>
  );
};
