import { useLocation } from 'react-router-dom';

export interface useLocationProps {
  clubId?: string;
}

export const useGetLocation = ({ clubId }: useLocationProps) => {
  const location = useLocation();

  if (clubId) {
    const rentDetailPage = location.pathname.includes(`/rent/${clubId}/detail`);
    const rentPage = location.pathname.includes(`/rent/${clubId}/book-rent`);
    return { rentDetailPage, rentPage };
  } else {
    const manageUserBookPage = location.pathname.includes(`/manage/user-book`);
    const manageClubBookPage = location.pathname.includes(`/manage/club-book`);
    return { manageClubBookPage, manageUserBookPage };
  }
};
