import { rows } from '@/constant';
import { Book1PNG } from '@/assets';

import * as S from './styled';

export const Section: React.FC = () => {
  return (
    <S.SectionContainer>
      <S.Slider>
        <S.TitleContainer>
          <S.SubTitle>박찬영님은 현재 3권 대출 가능해요.</S.SubTitle>
          <S.MainTitle>대출 가능한 도서</S.MainTitle>
        </S.TitleContainer>
        {rows.map((index, i) => (
          <S.BookContainer key={i}>
            <S.Book src={Book1PNG} />
            <S.BookTitle>asdfasdfasdfsafs</S.BookTitle>
          </S.BookContainer>
        ))}
      </S.Slider>
    </S.SectionContainer>
  );
};
