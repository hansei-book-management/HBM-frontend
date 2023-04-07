import React from 'react';

import { Book1PNG } from '@/assets';

import * as S from './styled';

export const Main: React.FC = () => {
  const rows = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
    {
      id: 6,
    },
    {
      id: 7,
    },
    {
      id: 8,
    },
    {
      id: 9,
    },
    {
      id: 10,
    },
  ];
  return (
    <>
      <S.MainContainer>
        {rows.map((row, i) => (
          <div style={{ marginRight: 30 }}>
            <img src={Book1PNG} alt="book1" key={i} />
            <h1>Hi, I'm a React component</h1>
          </div>
        ))}
      </S.MainContainer>
      <S.MainContainer>
        {rows.map((row, i) => (
          <div style={{ marginRight: 30 }}>
            <img src={Book1PNG} alt="book1" key={i} />
            <h1>Hi, I'm a React component</h1>
          </div>
        ))}
      </S.MainContainer>
      <S.MainContainer>
        {rows.map((row, i) => (
          <div style={{ marginRight: 30 }}>
            <img src={Book1PNG} alt="book1" key={i} />
            <h1>Hi, I'm a React component</h1>
          </div>
        ))}
      </S.MainContainer>
      <S.MainContainer>
        {rows.map((row, i) => (
          <div style={{ marginRight: 30 }}>
            <img src={Book1PNG} alt="book1" key={i} />
            <h1>Hi, I'm a React component</h1>
          </div>
        ))}
      </S.MainContainer>
    </>
  );
};
