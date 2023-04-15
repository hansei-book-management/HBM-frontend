import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { CLUB_LIST } from '@/constant';
import { Section } from '@/components';

import * as S from './styled';

const teamLinkIsActive = (clubId?: string, id?: string) => clubId === id;

export const Rent: React.FC = () => {
  const navigate = useNavigate();
  const { clubId } = useParams<{ clubId: string }>();
  const activeClub = CLUB_LIST.find(({ id }) => id === clubId);

  useEffect(() => {
    if (!activeClub) {
      navigate(`/rent/${CLUB_LIST[0].id}`);
    }
  }, []);

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
      <Section />
    </S.RentPageContainer>
  );
};
