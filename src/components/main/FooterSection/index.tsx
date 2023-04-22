import React from 'react';

import { Text } from '@/components';
import { useScrollFadeIn } from '@/hooks';

import { Button } from '../../common/Button';

import * as S from './styled';

export const FooterSection: React.FC = () => {
  const animation = useScrollFadeIn<HTMLHeadingElement>('up', 0.7);
  return (
    <S.FooterSectionContainer {...animation}>
      <Text.Column>
        <Text size="medium">멋져 보인다고요?</Text>
        <Text size="small">HANBOOK 서비스는 부장이 신청하면 자유롭게 이용할 수 있어요!</Text>
      </Text.Column>
      <Button to="/" description="서비스 신청하기" />
    </S.FooterSectionContainer>
  );
};
