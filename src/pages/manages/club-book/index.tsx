import React from 'react';
import { useLocation } from 'react-router-dom';

import { MANAGE_CLUB_BOOK_OPTIONS } from '@/constant';

import * as S from './styled';

export const ManageClubBookPage: React.FC = () => {
  const location = useLocation();
  const manageBookOption = location.search;

  const activeOption = MANAGE_CLUB_BOOK_OPTIONS.find(
    ({ id }) => '?options=' + id === manageBookOption,
  );

  const manageBookOptionsIsActive = (manageBookOption?: string, id?: string) =>
    manageBookOption === '?options=' + id;

  return (
    <S.ManageClubBookPageContainer>
      <S.ManageClubBookPageOptionList>
        {MANAGE_CLUB_BOOK_OPTIONS.map(({ name, id }) => (
          <S.ManageClubBookPageOptionItem
            to={`/manage/club-book/?options=${id}`}
            isActive={manageBookOptionsIsActive(manageBookOption, id)}
          >
            {name}
          </S.ManageClubBookPageOptionItem>
        ))}
      </S.ManageClubBookPageOptionList>
      <S.ManageClubBookPageTitle>{activeOption?.text}</S.ManageClubBookPageTitle>
    </S.ManageClubBookPageContainer>
  );
};
