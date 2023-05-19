import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useRecoilState } from 'recoil';

import { MANAGE_CLUB_BOOK_OPTIONS } from '@/constant';
import { RentMessage, Section, DetailModal, HeaderSection } from '@/components';
import { useModal } from '@/hooks';
import { StatusState } from '@/atoms';

import * as S from './styled';

const BASE_URL = '/manage/club-book';

export const ManageClubBookPage: React.FC = () => {
  const navigate = useNavigate();
  const { modalActive, open, close } = useModal();
  const [status, setStatus] = useRecoilState(StatusState);

  const { option } = useParams<{ option: string }>();
  const activeOption = MANAGE_CLUB_BOOK_OPTIONS.find(({ id }) => id === option);
  const onClick = () => {
    open();
  };

  useEffect(() => {
    status && setStatus(false);
    window.scrollTo(0, 0);
    if (!activeOption) {
      navigate(`${BASE_URL}/${MANAGE_CLUB_BOOK_OPTIONS[0].id}`);
    }
  }, [activeOption]);

  return (
    <S.ManageClubBookContainer>
      {activeOption && (
        <HeaderSection
          name={activeOption.text}
          activeId={option}
          href={`${BASE_URL}`}
          list={MANAGE_CLUB_BOOK_OPTIONS}
          onClick={onClick}
        />
      )}
      <Section mangeClubName="hsoc" />
      {modalActive && (
        <DetailModal
          message={<RentMessage canRent={true} />}
          rightButtonText="닫기"
          onNavigate={close}
        />
      )}
    </S.ManageClubBookContainer>
  );
};
