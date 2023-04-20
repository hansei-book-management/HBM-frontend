import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import { RentPage, MainPage, ManagePage } from './pages';
import { DefaultLayout } from './components';
import { CLUB_LIST } from './constant';
import { RegisterPage } from './pages/auth';

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
        <Route path="/auth">
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
