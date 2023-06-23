import React from 'react';

import { useGetLocation } from '@/hooks';

import { RentMessage } from '../RentMessage';

import * as S from './styled';

export interface StatusMessageProps {
  canRent: boolean;
  userName?: string;
}

export const StatusMessage: React.FC<StatusMessageProps> = ({ canRent, userName }) => {
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
    return <S.StatusMessage>대여중</S.StatusMessage>;
  }
  if (manageClubCanRentBookPage) {
    return <RentMessage canRent={true} />;
  }
  if (manageClubBorrowBookPage) {
    return <S.StatusMessage>{userName}: 대여중</S.StatusMessage>;
  }
  if (manageClubAllBookPage) {
    if (canRent) {
      return <RentMessage canRent={true} />;
    } else {
      return <S.StatusMessage>{userName}: 대여중</S.StatusMessage>;
    }
  }
  return null;
};
