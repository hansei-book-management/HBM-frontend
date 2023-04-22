import { useLocation } from 'react-router-dom';

export interface useLocationProps {
  clubId?: string;
}

export const useGetLocation = ({ clubId }: useLocationProps) => {
  const location = useLocation();

  if (clubId) {
    const rentDetailPage = location.pathname.includes(`/rent/${clubId}/detail`);
    const rentBookPage = location.pathname.includes(`/rent/${clubId}/book-rent`);
    return { rentDetailPage, rentBookPage };
  } else {
    const rentPage = location.pathname.includes(`/rent`);
    const manageUserBookPage = location.pathname.includes(`/manage/user-book`);
    const manageClubCanRentBookPage = location.search.includes(`?options=can-rent`);
    const manageClubAllBookPage = location.search.includes(`?options=all`);
    const manageClubRentingBookPage = location.search.includes(`?options=renting`);
    return {
      rentPage,
      manageUserBookPage,
      manageClubCanRentBookPage,
      manageClubAllBookPage,
      manageClubRentingBookPage,
    };
  }
};
