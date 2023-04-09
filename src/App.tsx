import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import { Rent, Manage, Main } from './pages';
import { DefaultLayout } from './components';
import { CLUB_LIST } from './constant';

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
        <Route path="/" element={<Main />} />
        <Route path="/rent">
          <Route index element={<Navigate to={`/rent/${CLUB_LIST[0].id}`} />} />
          <Route path=":clubId" element={<Rent />} />
        </Route>
        <Route path="/manage" element={<Manage />} />
      </Route>
    </Routes>
  );
};

export default App;
