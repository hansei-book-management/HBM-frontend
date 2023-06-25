import * as S from './styled';

export const Footer: React.FC = () => {
  return (
    <S.FooterContainer>
      <S.FooterTitle to="/">HANBOOK</S.FooterTitle>
      <S.FooterText>
        최근원 | 안수현
        <br />
        kidjustinchoi@gmail.com(문의)
      </S.FooterText>
      <S.FooterText>© HANBOOK. 2023 All rights reserved</S.FooterText>
    </S.FooterContainer>
  );
};
