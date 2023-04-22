import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import {
  RentPage,
  MainPage,
  ManageUserBookPage,
  NotFoundPage,
  ManageClubBookPage,
  RegisterPage,
} from './pages';
import { DefaultLayout } from './components';
import { CLUB_LIST, MANAGE_CLUB_BOOK_OPTIONS } from './constant';

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
          <Route index element={<Navigate to={`/rent/${CLUB_LIST[0].id}`} />} />
          <Route path=":clubId" element={<RentPage />} />
          <Route path=":clubId/book-rent/:bookId" element={<RentPage />} />
          <Route path=":clubId/detail/:bookId" element={<RentPage />} />
        </Route>
        <Route path="/manage">
          <Route path="user-book" element={<ManageUserBookPage />} />
          <Route path="club-book" element={<ManageClubBookPage />} />
        </Route>
        <Route path="/auth">
          <Route path="register" element={<RegisterPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
