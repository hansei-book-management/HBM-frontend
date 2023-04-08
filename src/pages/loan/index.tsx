import { rows } from '@/constant';
import { Book1PNG } from '@/assets';

import * as S from './styled';

export const Loan: React.FC = () => {
  return (
    <S.SectionContainer>
      <S.SubTitle>박찬영님은 현재 3권 대출 가능해요.</S.SubTitle>
      <S.MainTitle>대출 가능한 도서</S.MainTitle>
      <S.Slider>
        {rows.map((index, i) => (
          <S.ImageContainer>
            <S.Image src={Book1PNG} />
            <h3>asdf</h3>
          </S.ImageContainer>
        ))}
      </S.Slider>
    </S.SectionContainer>
  );
};
