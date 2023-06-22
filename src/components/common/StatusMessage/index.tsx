import React from 'react';

import { useGetLocation } from '@/hooks';

import { RentMessage } from '../RentMessage';

import * as S from './styled';

export interface StatusMessageProps {
  canRent: boolean;
}

export const StatusMessage: React.FC<StatusMessageProps> = ({ canRent }) => {
  const {
    rentPage,
    manageUserBookPage,
    manageClubAllBookPage,
    manageClubCanRentBookPage,
    manageClubBorrowBookPage,
  } = useGetLocation({});

  if (rentPage) {
    return <RentMessage canRent={canRent} />;
  }
  if (manageUserBookPage) {
    return (
      <S.StatusMessage isOk={canRent}>
        대여중 - 2일 1시간 {canRent ? '남음' : '연체중'}
      </S.StatusMessage>
    );
  }
  if (manageClubCanRentBookPage) {
    return <RentMessage canRent={true} />;
  }
  if (manageClubBorrowBookPage) {
    return (
      <S.StatusMessage isOk={canRent}>
        김태훈: 대여중 - 2일 1시간 {canRent ? '남음' : '연체중'}
      </S.StatusMessage>
    );
  }
  if (manageClubAllBookPage) {
    const isOk = true;
    if (canRent) {
      return <RentMessage canRent={true} />;
    } else {
      return (
        <S.StatusMessage isOk={isOk}>
          김태훈: 대여중 - 2일 1시간 {isOk ? '남음' : '연체중'}
        </S.StatusMessage>
      );
    }
  }
  return null;
};
