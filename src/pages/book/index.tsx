import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { DetailModal, HeaderSection, Section } from '@/components';
import { useGetClubs, useModal } from '@/hooks';

import * as S from './styled';

export const BookPage: React.FC = () => {
  const { data, isFetching } = useGetClubs();
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
    if ((!activeClub && clubs) || (clubs && !isFetching)) {
      navigate(`/book/${clubs[0].name}`);
    }
  }, [activeClub]);

  return (
    <>
      {isFetching ? null : activeClub ? (
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
      ) : (
        <S.BookPageContainer>
          <HeaderSection activeId={clubId} href="/club" list={clubs || []} />
          <h1 style={{ fontSize: '1.4rem', fontWeight: 600 }}>동아리를 선택해주세요.</h1>
        </S.BookPageContainer>
      )}
    </>
  );
};
