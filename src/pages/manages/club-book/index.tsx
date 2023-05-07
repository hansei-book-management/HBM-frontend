import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

import { useRecoilState } from 'recoil';

import { MANAGE_CLUB_BOOK_OPTIONS } from '@/constant';
import { RentMessage, Section } from '@/components';
import { useModal } from '@/hooks';
import { DetailModal } from '@/components/modal/DetailModal';
import { BookState, StatusState } from '@/atoms';

import * as S from './styled';

export const ManageClubBookPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { modalActive, open } = useModal();
  const [status, setStatus] = useRecoilState(StatusState);
  const [bookClick, setBookClick] = useRecoilState(BookState);

  const { option } = useParams<{ option: string }>();
  const activeOption = MANAGE_CLUB_BOOK_OPTIONS.find(({ id }) => id === option);
  const manageBookOptionsIsActive = (option?: string, id?: string) => option === id;
  const onClick = () => {
    setStatus(false);
    setBookClick(false);
    navigate(`/manage/club-book/${option}/?book-add-step=1`);
    open();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!activeOption) {
      navigate(`/manage/club-book/${MANAGE_CLUB_BOOK_OPTIONS[0].id}`);
    }
  }, []);

  return (
    <S.ManageClubBookPageContainer>
      <S.ManageClubBookPageOptionList>
        {MANAGE_CLUB_BOOK_OPTIONS.map(({ name, id }) => (
          <S.ManageClubBookPageOptionItem
            to={`/manage/club-book/${id}`}
            isActive={manageBookOptionsIsActive(option, id)}
          >
            {name}
          </S.ManageClubBookPageOptionItem>
        ))}
        <S.ManageClubBookPageAddIconWrap onClick={onClick}>
          <FaPlus size={'0.9rem'} />
        </S.ManageClubBookPageAddIconWrap>
      </S.ManageClubBookPageOptionList>
      <S.ManageClubBookPageTitle>{activeOption?.text}</S.ManageClubBookPageTitle>
      <Section mangeClubName="hsoc" />
      {modalActive && !status && !bookClick && <h1>Hello</h1>}
      {modalActive && bookClick && <DetailModal message={<RentMessage canRent={true} />} />}
    </S.ManageClubBookPageContainer>
  );
};
