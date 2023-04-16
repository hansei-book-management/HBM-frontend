import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import { RentPage, MainPage, DetailPage, ManagePage } from './pages';
import { DefaultLayout } from './components';
import { CLUB_LIST } from './constant';
import { RegisterPage } from './pages/account';

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
        </Route>
        <Route path="/manage" element={<ManagePage />} />
        <Route path="/detail">
          <Route index element={<DetailPage />} />
          <Route path=":bookId" element={<DetailPage />} />
        </Route>
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
};

export default App;
