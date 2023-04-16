import React from 'react';

import { Text } from '@/components/common';
import { useScrollFadeIn } from '@/hooks';

import { Button } from '../../common/Button';

import * as S from './styled';

export interface MainSectionProps {
  smallText: string | React.ReactNode;
  largeText: string;
  imageUrl: string;
  isSecondary?: boolean;
}

export const MainSection: React.FC<MainSectionProps> = ({
  smallText,
  largeText,
  imageUrl,
  isSecondary,
}) => {
  const animation = useScrollFadeIn<HTMLHeadingElement>('up', 0.7);
  return (
    <S.MainSectionContainer isSecondary={isSecondary} {...animation}>
      <Text.Column>
        <Text size="small">{smallText}</Text>
        <Text size="large">{largeText}</Text>
        <div style={{ width: 'fit-content' }}>
          {largeText === 'HANBOOK' && <Button to="/" description="서비스 신청하기" />}
        </div>
      </Text.Column>
      <S.MainSectionImage src={imageUrl} />
    </S.MainSectionContainer>
  );
};
