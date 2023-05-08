import { useLocation } from 'react-router-dom';

export interface useLocationProps {
  clubId?: string;
}

export const useGetLocation = ({ clubId }: useLocationProps) => {
  const location = useLocation();

  const RENT = '/rent';
  const MANAGE_CLUB = '/manage/club-book';

  if (clubId) {
    const rentDetailPage = location.pathname.includes(`${RENT}/${clubId}/detail`);
    const rentBookPage = location.pathname.includes(`${RENT}/${clubId}/book-rent`);
    return { rentDetailPage, rentBookPage };
  } else {
    const rentPage = location.pathname.includes(`${RENT}`);
    const manageUserBookPage = location.pathname.includes(`/manage/user-book`);
    const manageClubCanRentBookPage = location.pathname === `${MANAGE_CLUB}/can-rent`;
    const manageClubAllBookPage = location.pathname === `${MANAGE_CLUB}/all`;
    const manageClubRentingBookPage = location.pathname === `${MANAGE_CLUB}/renting`;
    return {
      rentPage,
      manageUserBookPage,
      manageClubCanRentBookPage,
      manageClubAllBookPage,
      manageClubRentingBookPage,
    };
  }
};
