import { useLocation } from 'react-router-dom';

import { CLUB, MANAGE_CLUB_BOOK } from '@/constant';

export interface useLocationProps {
  clubId?: string;
  bookId?: number;
}

export const useGetLocation = ({ clubId, bookId }: useLocationProps) => {
  const location = useLocation();

  if (clubId) {
    const clubBookDetailPage = location.pathname === `${CLUB}/${clubId}/book/${bookId}`;
    const clubBookRentPage = location.pathname.includes(
      `${CLUB}/${clubId}/book/${bookId}/book-rent`,
    );
    return { clubBookDetailPage, clubBookRentPage };
  } else {
    const rentPage = location.pathname.includes(`${CLUB}`);
    const manageUserBookPage = location.pathname.includes(`/manage/user-book`);
    const manageClubCanRentBookPage = location.pathname === `${MANAGE_CLUB_BOOK}/can-rent`;
    const manageClubAllBookPage = location.pathname === `${MANAGE_CLUB_BOOK}/all`;
    const manageClubBorrowBookPage = location.pathname === `${MANAGE_CLUB_BOOK}/borrow`;
    return {
      rentPage,
      manageUserBookPage,
      manageClubCanRentBookPage,
      manageClubAllBookPage,
      manageClubBorrowBookPage,
    };
  }
};
