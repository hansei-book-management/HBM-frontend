import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { CLUB_LIST } from '@/constant';
import { Section } from '@/components';

import * as S from './styled';

export const Rent: React.FC = () => {
  const navigate = useNavigate();
  const { clubId } = useParams<{ clubId: string }>();
  const activeClub = CLUB_LIST.find(({ id }) => id === clubId);

  useEffect(() => {
    if (!CLUB_LIST.find(({ id }) => id === clubId)) {
      navigate(`/rent/${CLUB_LIST[0].id}`);
    }
  }, []);

  return (
    <S.TeamPageContainer>
      <S.TeamList>
        {CLUB_LIST.map(({ name, id }) => (
          <S.TeamLink to={`/rent/${id} `} isActive={clubId === id}>
            {name}
          </S.TeamLink>
        ))}
      </S.TeamList>
      {activeClub && <S.TeamPageTitle>{activeClub.name} 도서</S.TeamPageTitle>}
      <Section />
    </S.TeamPageContainer>
  );
};
