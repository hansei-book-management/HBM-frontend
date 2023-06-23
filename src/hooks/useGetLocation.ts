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
    const bookPage = location.pathname.includes('/book/');
    const rentPage = location.pathname.includes(`${CLUB}/`);
    const manageUserBookPage = location.pathname.includes(`/user-book`);
    const manageClubBookPage = location.pathname.includes(`${MANAGE_CLUB_BOOK}`);
    const manageClubCanRentBookPage = location.pathname === `${MANAGE_CLUB_BOOK}/can-rent`;
    const manageClubAllBookPage = location.pathname === `${MANAGE_CLUB_BOOK}/all`;
    const manageClubBorrowBookPage = location.pathname === `${MANAGE_CLUB_BOOK}/renting`;
    return {
      bookPage,
      rentPage,
      manageUserBookPage,
      manageClubCanRentBookPage,
      manageClubAllBookPage,
      manageClubBorrowBookPage,
      manageClubBookPage,
    };
  }
};
