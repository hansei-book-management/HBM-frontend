import { ICON_LIST } from '@/constant';

import * as S from './styled';

export const Footer: React.FC = () => {
  return (
    <S.FooterContainer>
      <S.FooterTitle to="/">HANBOOK</S.FooterTitle>
      <S.FooterIcon>
        {ICON_LIST.map(({ icon, href }, i) => (
          <S.IconWrapper to={href} key={i}>
            {icon}
          </S.IconWrapper>
        ))}
      </S.FooterIcon>
      <S.FooterText>© HANBOOK. 2023 All rights reserved</S.FooterText>
    </S.FooterContainer>
  );
};
