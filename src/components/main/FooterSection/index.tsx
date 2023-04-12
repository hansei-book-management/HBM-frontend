import React from 'react';

import { Text } from '@/components';

import * as S from './styled';

export const FooterSection: React.FC = () => {
  return (
    <S.FooterSectionContainer>
      <Text.Column>
        <Text size="medium">멋져 보인다고요?</Text>
        <Text size="small">HANBOOK 서비스는 동아리 부장이라면 자유롭게 신청할수 있어요!</Text>
      </Text.Column>
      <S.ApplyButton to="/">서비스 신청하기</S.ApplyButton>
    </S.FooterSectionContainer>
  );
};
