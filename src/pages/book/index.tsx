import React from 'react';
import { useParams } from 'react-router-dom';

import { CLUB_LIST } from '@/constant';
import { DetailModal, HeaderSection, Section } from '@/components';
import { useModal } from '@/hooks';

import * as S from './styled';

export const BookPage: React.FC = () => {
  const { clubId } = useParams<{ clubId: string }>();
  const activeClub = CLUB_LIST.find(({ id }) => id === clubId);

  const { modalActive } = useModal();

  return (
    <S.BookPageContainer>
      {activeClub && (
        <HeaderSection
          name={activeClub.name}
          activeId={clubId}
          href="/book"
          list={CLUB_LIST}
          notShowPlusIcon={true}
        />
      )}
      <Section activeClub={activeClub} />
      {modalActive && <DetailModal leftButtonText="닫기" />}
    </S.BookPageContainer>
  );
};
