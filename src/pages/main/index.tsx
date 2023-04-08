import React from 'react';

import { Book1PNG } from '@/assets';
import { rows } from '@/constant';

import * as S from './styled';

export const Main: React.FC = () => {
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
