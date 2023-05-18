import React from 'react';

import { useGetLocation } from '@/hooks';

import { RentMessage } from '../RentMessage';

import * as S from './styled';

export const Rent: React.FC = () => {
  const {
    rentPage,
    manageUserBookPage,
    manageClubAllBookPage,
    manageClubCanRentBookPage,
    manageClubRentingBookPage,
  } = useGetLocation({});

  const canRent = true;
  const id = Math.floor(Math.random() * 10) + 1;

  console.log(
    manageUserBookPage,
    'user book',
    manageClubCanRentBookPage,
    'can rent book ',
    manageClubRentingBookPage,
    'renting books',
    manageClubAllBookPage,
    'all books',
  );

  if (rentPage) {
    return <RentMessage canRent={canRent} />;
  } else if (manageUserBookPage) {
    return (
      <S.SectionManageMessage isOk={canRent}>
        대여중 - 2일 1시간 {canRent ? '남음' : '연체중'}
      </S.SectionManageMessage>
    );
  }
  if (manageClubCanRentBookPage) {
    return <RentMessage canRent={true} />;
  }
  if (manageClubRentingBookPage) {
    return (
      <S.SectionManageMessage isOk={canRent}>
        김태훈: 대여중 - 2일 1시간 {canRent ? '남음' : '연체중'}
      </S.SectionManageMessage>
    );
  }
  if (manageClubAllBookPage) {
    const isOk = id !== 2;
    if (canRent) {
      return <div>hello</div>;
      // return <RentMessage canRent={true} />;
    } else {
      <S.SectionManageMessage isOk={isOk}>
        김태훈: 대여중 - 2일 1시간 {isOk ? '남음' : '연체중'}
      </S.SectionManageMessage>;
    }
  }
  return null;
};
