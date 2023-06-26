import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { DetailModal, HeaderSection, NoDataMessage, Section, Skeleton } from '@/components';
import { useGetClubs, useModal } from '@/hooks';

import * as S from './styled';

export const BookPage: React.FC = () => {
  const { data, isLoading } = useGetClubs();
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
    if (!activeClub && clubs && clubs.length > 0 && !isLoading) {
      navigate(`/book/${clubs[0].name}`);
    }
  }, [activeClub, isLoading]);

  return (
    <>
      {isLoading ? (
        <>
          <Skeleton />
        </>
      ) : clubs && clubs.length > 0 && activeClub ? (
        <S.BookPageContainer>
          <HeaderSection name={activeClub?.name} activeId={clubId} href="/book" list={clubs} />
          <Section data={activeClubBooks} navigateUrl={`/book/${activeClub?.name}`} />
          {modalActive && (
            <DetailModal
              data={activeClubBooks}
              leftButtonText="닫기"
              leftButtonClick={onBookDetailModalClose}
            />
          )}
        </S.BookPageContainer>
      ) : (
        <NoDataMessage
          message={`아무런 동아리 도서가 없어요.\n` + `지금 바로 동아리 도서를 추가하러 가볼까요?`}
          btnLink="/club-apply"
          btnMessage="도서 추가 바로가기"
        />
      )}
    </>
  );
};
