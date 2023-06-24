import { ICON_LIST } from '@/constant';

import * as S from './styled';

export interface FooterProps {
  isAuthLayout?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isAuthLayout = false }) => {
  return (
    <S.FooterContainer isAuthLayout={isAuthLayout}>
      <S.FooterTitle to="/">HANBOOK</S.FooterTitle>
      <S.FooterIcon>
        {ICON_LIST.map(({ icon, href }, i) => (
          <S.FooterIconWrapper to={href} key={i}>
            {icon}
          </S.FooterIconWrapper>
        ))}
      </S.FooterIcon>
      <S.FooterText>© HANBOOK. 2023 All rights reserved</S.FooterText>
    </S.FooterContainer>
  );
};
