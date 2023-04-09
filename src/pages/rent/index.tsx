import { useParams } from 'react-router-dom';

import { CLUB_LIST } from '@/constant';

import * as S from './styled';

export const Rent: React.FC = () => {
  const { clubId } = useParams<{ clubId: string }>();
  return (
    <S.TeamPageContainer>
      <S.TeamList>
        {CLUB_LIST.map(({ name, id }) => (
          <S.TeamLink to={`/rent/${id}`} isActive={clubId === id}>
            {name}
          </S.TeamLink>
        ))}
      </S.TeamList>
      <S.TeamPageTitle>보안관제 앙</S.TeamPageTitle>
    </S.TeamPageContainer>
  );
};
