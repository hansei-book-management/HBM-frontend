import React from 'react';

import { Book1PNG, Main1PNG, Main2PNG, Main3PNG } from '@/assets';
import { RENT_BOOK_LIST } from '@/constant';
import { MainSection } from '@/components/main/MainSection';

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
      {/* <S.MainContainer>{renderBookList()}</S.MainContainer>
      <S.MainContainer>{renderBookList()}</S.MainContainer>
      <S.MainContainer>{renderBookList()}</S.MainContainer>
      <S.MainContainer>{renderBookList()}</S.MainContainer> */}
      <MainSection
        smallText="한세사이버보안고등학교 자율동아리 도서관리 시스템"
        largeText="HANBOOK"
        imageUrl={Main1PNG}
      />
      <MainSection
        smallText="불편했던 동아리 도서관리, 이제 그만!"
        largeText="쉬운 도서관리"
        isSecondary={true}
        imageUrl={Main2PNG}
      />
      <MainSection
        smallText="한층 더 쉬워진 대출 관리 "
        largeText="한 눈에 보기"
        imageUrl={Main3PNG}
      />
    </>
  );
};
