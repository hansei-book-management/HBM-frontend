import React from 'react';

import * as S from './styled';

interface SkeletonProps {
  isManyBook?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({ isManyBook = true }) => {
  return (
    <S.SkeletonContainer>
      <S.SkeletonHeaderSection>
        <S.SkeletonHeaderSectionList>
          {[...Array(4)].map((_, index) => (
            <S.SkeletonHeaderSectionItem key={index} />
          ))}
        </S.SkeletonHeaderSectionList>
      </S.SkeletonHeaderSection>
      <S.SkeletonMainSection>
        {[...Array(isManyBook ? 20 : 8)].map((_, index) => (
          <S.SkeletonImageContainer key={index}>
            <S.SkeletonImage />
            <S.SkeletonImageInfoContainer>
              <S.SkeletonImageTitle />
              <S.SkeletonImageSubTitle />
            </S.SkeletonImageInfoContainer>
          </S.SkeletonImageContainer>
        ))}
      </S.SkeletonMainSection>
    </S.SkeletonContainer>
  );
};
