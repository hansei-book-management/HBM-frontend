import React from 'react';

import * as S from './styled';

interface SkeletonProps {
  isUserBookPage?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({ isUserBookPage = false }) => {
  return (
    <S.SkeletonContainer>
      <S.SkeletonHeaderSection>
        {isUserBookPage && (
          <>
            <S.SkeletonHeaderSectionSubTitle />
            <S.SkeletonHeaderSectionTitle />
          </>
        )}
        <S.SkeletonHeaderSectionList>
          {[...Array(4)].map((_, index) => (
            <S.SkeletonHeaderSectionItem key={index} />
          ))}
        </S.SkeletonHeaderSectionList>
        {!isUserBookPage && (
          <>
            <S.SkeletonHeaderSectionTitle />
          </>
        )}
      </S.SkeletonHeaderSection>
      <S.SkeletonMainSection>
        {[...Array(20)].map((_, index) => (
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
