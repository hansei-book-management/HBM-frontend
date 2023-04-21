import React from 'react';

import * as S from './styled';

interface SkeletonProps {
  isRentPage: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({ isRentPage }) => {
  return (
    <S.SkeletonContainer>
      {[...Array(isRentPage ? 20 : 8)].map((_, index) => (
        <S.SkeletonImageContainer key={index}>
          <S.SkeletonImage />
          <S.SkeletonImageInfoContainer>
            <S.SkeletonImageTitle />
            <S.SkeletonImageSubTitle />
            {isRentPage && <S.SkeletonImageMessage />}
          </S.SkeletonImageInfoContainer>
        </S.SkeletonImageContainer>
      ))}
    </S.SkeletonContainer>
  );
};
