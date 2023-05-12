import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import {
  RentPage,
  MainPage,
  ManageUserBookPage,
  NotFoundPage,
  ManageClubBookPage,
  RegisterPage,
  ManageUserPage,
  LoginPage,
  ClubApplyPage,
} from './pages';
import { DefaultLayout } from './components';
import { MANAGE_CLUB_BOOK_OPTIONS, RENT_CLUB_LIST, USER_CLUB_LIST } from './constant';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route
        element={
          <DefaultLayout>
            <Outlet />
          </DefaultLayout>
        }
      >
        <Route path="/" element={<MainPage />} />
        <Route path="/rent">
          <Route index element={<Navigate to={`/rent/${RENT_CLUB_LIST[0].id}`} />} />
          <Route path=":rentClubId" element={<RentPage />} />
          <Route path=":rentClubId/book-rent/:bookId" element={<RentPage />} />
          <Route path=":rentClubId/detail/:bookId" element={<RentPage />} />
        </Route>
        <Route path="/manage">
          <Route path="user-book">
            <Route index element={<Navigate to={`/manage/user-book/${USER_CLUB_LIST[0].id}`} />} />
            <Route path=":userClubId" element={<ManageUserBookPage />} />
          </Route>
          <Route path="club-book" element={<ManageClubBookPage />}>
            <Route
              index
              element={<Navigate to={`/manage/club-book/${MANAGE_CLUB_BOOK_OPTIONS[0].id}`} />}
            />
            <Route path=":option" element={<ManageUserBookPage />} />
          </Route>
          <Route path="user" element={<ManageUserPage />} />
        </Route>
        <Route path="/auth">
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
        <Route path="club-apply" element={<ClubApplyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
