import React from 'react';

import { HELLO } from '@/constant';
import { Book1PNG } from '@/assets';

export const Main: React.FC = () => {
  return (
    <div>
      <img src={Book1PNG} alt="book1" />
      <h1>Hi, I'm a React component</h1>
      <h1>{HELLO}</h1>
    </div>
  );
};
