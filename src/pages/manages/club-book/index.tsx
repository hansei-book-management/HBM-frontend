import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { MANAGE_CLUB_BOOK_OPTIONS } from '@/constant';
import { Section } from '@/components';
import { useModal } from '@/hooks';
import { DetailModal } from '@/components/modal/DetailModal';

import * as S from './styled';

export const ManageClubBookPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const manageBookOption = location.search;

  const activeOption = MANAGE_CLUB_BOOK_OPTIONS.find(
    ({ id }) => '?options=' + id === manageBookOption,
  );

  const manageBookOptionsIsActive = (manageBookOption?: string, id?: string) =>
    manageBookOption === '?options=' + id;

  const { modalActive } = useModal();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!activeOption) {
      navigate(`/manage/club-book/?options=${MANAGE_CLUB_BOOK_OPTIONS[0].id}`);
    }
  }, [activeOption]);

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
      <Section />
      {modalActive && <DetailModal />}
    </S.ManageClubBookPageContainer>
  );
};
