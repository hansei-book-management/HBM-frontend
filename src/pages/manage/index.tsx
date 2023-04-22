import { useEffect } from 'react';

import { Section } from '@/components';

import * as S from './styled';

export const ManagePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <S.ManagePageContainer>
      <S.ManageMessage>
        현재 3일 1시간 연체중이에요. 도서 대여가 정지될 수도 있으니 빨리 반납해 주세요.
      </S.ManageMessage>
      <S.ManagePageSubTitle>앙기모링님은 현재 2권 대출중이에요.</S.ManagePageSubTitle>
      <S.ManagePageTitle>대출 중인 도서</S.ManagePageTitle>
      <Section />
    </S.ManagePageContainer>
  );
};
