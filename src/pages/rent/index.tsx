import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { CLUB_LIST, RENT_BOOK_LIST } from '@/constant';
import { Book, Section } from '@/components';
import { Book1PNG } from '@/assets';

import * as S from './styled';

const teamLinkIsActive = (clubId?: string, id?: string) => clubId === id;

export const Rent: React.FC = () => {
  const navigate = useNavigate();
  const { clubId } = useParams<{ clubId: string }>();
  const activeClub = CLUB_LIST.find(({ id }) => id === clubId);

  return (
    <S.RentPageContainer>
      <S.TeamList>
        {CLUB_LIST.map(({ name, id }) => (
          <S.TeamLink to={`/rent/${id} `} isActive={teamLinkIsActive(clubId, id)}>
            {name}
          </S.TeamLink>
        ))}
      </S.TeamList>
      {activeClub && <S.RentPageTitle>{activeClub.name} 도서</S.RentPageTitle>}
      <Section bookList={RENT_BOOK_LIST} />
    </S.RentPageContainer>
  );
};
