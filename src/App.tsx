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
import { DefaultLayout, PrivateRoute } from './components';
import { MANAGE_CLUB_BOOK_OPTIONS, CLUB_LIST, USER_CLUB_LIST } from './constant';
import { instance, setAccessToken } from './api';

export const App: React.FC = () => {
  useEffect(() => {
    if (instance.defaults.headers.common.Authorization)
      setAccessToken(instance.defaults.headers.common.Authorization.toString().split(' ')[1]);
  }, [instance.defaults.headers.common.Authorization]);

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
        <Route element={<PrivateRoute isUserPage={true} />}>
          <Route path="/club">
            <Route index element={<Navigate to={`/club/${USER_CLUB_LIST[0].id}`} />} />
            <Route path=":clubId" element={<RentPage />}>
              <Route path="book/:bookId/book-rent" element={<RentPage />} />
              <Route path="book/:bookId" element={<RentPage />} />
              <Route path="club-add" element={<RentPage />} />
            </Route>
          </Route>
          <Route path="/user-book">
            <Route index element={<Navigate to={`/user-book/${USER_CLUB_LIST[0].id}`} />} />
            <Route path=":userClubId" element={<ManageUserBookPage />} />
          </Route>
          <Route path="club-apply" element={<ClubApplyPage />} />
        </Route>
        <Route element={<PrivateRoute isDirectorPage={true} />}>
          <Route path="/club-book" element={<ManageClubBookPage />}>
            <Route
              index
              element={<Navigate to={`/club-book/${MANAGE_CLUB_BOOK_OPTIONS[0].id}`} />}
            />
            <Route path=":option" element={<ManageUserBookPage />} />
          </Route>
          <Route path="/manage-club" element={<ManageClubPage />}>
            <Route path="member/:userId" element={<ManageClubPage />}>
              <Route path="detail" element={<ManageClubPage />} />
              <Route path="expel" element={<ManageClubPage />} />
              <Route path="status" element={<ManageClubPage />} />
            </Route>
            <Route path="delete" element={<ManageClubPage />} />
            <Route path="change-director" element={<ManageClubPage />} />
          </Route>
        </Route>
        <Route element={<PrivateRoute isUserPage={false} />}>
          <Route path="auth">
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
