import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import { Main } from './pages';
import { DefaultLayout } from './components';

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
      </Route>
    </Routes>
  );
};

export default App;
