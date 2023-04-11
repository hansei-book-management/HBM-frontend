import React from 'react';

import { Book1PNG } from '@/assets';
import { RENT_BOOK_LIST } from '@/constant';

import * as S from './styled';

export const Main: React.FC = () => {
  const renderBookList = () =>
    RENT_BOOK_LIST.map((img, i) => (
      <div style={{ marginRight: 30 }} key={i}>
        <img src={Book1PNG} alt="book1" key={i} />
        <h1>Hi, I'm a React component</h1>
      </div>
    ));

  return (
    <>
      <S.MainContainer>{renderBookList()}</S.MainContainer>
      <S.MainContainer>{renderBookList()}</S.MainContainer>
      <S.MainContainer>{renderBookList()}</S.MainContainer>
      <S.MainContainer>{renderBookList()}</S.MainContainer>
    </>
  );
};
