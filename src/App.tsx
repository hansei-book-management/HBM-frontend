import React, { useEffect } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import {
  RentPage,
  MainPage,
  ManageUserBookPage,
  NotFoundPage,
  ManageClubBookPage,
  RegisterPage,
  ManageClubPage,
  LoginPage,
  ClubApplyPage,
  BookPage,
} from './pages';
import { DefaultLayout } from './components';
import { MANAGE_CLUB_BOOK_OPTIONS, CLUB_LIST, USER_CLUB_LIST } from './constant';

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
        <Route path="/book">
          <Route index element={<Navigate to={`/book/${CLUB_LIST[0].id}`} />} />
          <Route path=":clubId" element={<BookPage />} />
        </Route>
        <Route path="/club">
          <Route index element={<Navigate to={`/club/${USER_CLUB_LIST[0].id}`} />} />
          <Route path=":clubId" element={<RentPage />}>
            <Route path="book/:bookId/book-rent" element={<RentPage />} />
            <Route path="book/:bookId" element={<RentPage />} />
            <Route path="club-add" element={<RentPage />} />
          </Route>
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
        </Route>
        <Route path="/manage-club" element={<ManageClubPage />}>
          <Route path="generate-code" element={<ManageClubPage />} />
          <Route path="member/:userId" element={<ManageClubPage />}>
            <Route path="detail" element={<ManageClubPage />} />
            <Route path="expel" element={<ManageClubPage />} />
            <Route path="status" element={<ManageClubPage />} />
          </Route>
          <Route path="delete" element={<ManageClubPage />} />
          <Route path="change-director" element={<ManageClubPage />} />
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
