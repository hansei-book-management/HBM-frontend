import React from 'react';

import { Text } from '@/components/common';

import * as S from './styled';

export interface MainSectionProps {
  smallText: string;
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
  return (
    <S.MainSectionContainer isSecondary={isSecondary}>
      <Text.Column>
        <Text size="small">{smallText}</Text>
        <Text size="large">{largeText}</Text>
      </Text.Column>
      <S.MainSectionImage src={imageUrl} />
    </S.MainSectionContainer>
  );
};
