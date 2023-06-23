import React from 'react';
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
import { MANAGE_CLUB_BOOK_OPTIONS } from './constant';

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
        <Route path="/book" element={<BookPage />}>
          <Route path=":clubId" element={<BookPage />} />
          <Route path=":clubId/:bookId" element={<BookPage />} />
        </Route>
        <Route element={<PrivateRoute isUserPage={true} />}>
          <Route path="/club" element={<RentPage />}>
            <Route path=":clubId" element={<RentPage />}>
              <Route path="book/:bookId/book-rent" element={<RentPage />} />
              <Route path=":bookId" element={<RentPage />} />
              <Route path="club-add" element={<RentPage />} />
            </Route>
          </Route>
          <Route path="/user-book" element={<ManageUserBookPage />}>
            <Route path=":clubId" element={<ManageUserBookPage />} />
            <Route path=":clubId/book/:bookId" element={<ManageUserBookPage />} />
          </Route>
          <Route path="club-apply" element={<ClubApplyPage />} />
        </Route>
        <Route element={<PrivateRoute isDirectorPage={true} />}>
          <Route path="/club-book" element={<ManageClubBookPage />}>
            <Route
              index
              element={<Navigate to={`/club-book/${MANAGE_CLUB_BOOK_OPTIONS[0].id}`} />}
            />
            <Route path=":option" element={<ManageClubBookPage />} />
            <Route path=":option/book/:bookId" element={<ManageClubBookPage />} />
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
        <Route element={<PrivateRoute isLoginPage={true} />}>
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
