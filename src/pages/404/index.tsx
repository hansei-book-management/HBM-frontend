import React, { useEffect } from 'react';
import Lottie from 'react-lottie';

import { useGetWindowSize } from '@/hooks';
import { notFoundPageLottieOptions } from '@/constant';

import * as S from './styled';

export const NotFoundPage: React.FC = () => {
  const { getWidth } = useGetWindowSize();

  useEffect(() => {
    document.title = '404 Not Found';
  }, [getWidth]);
  return (
    <S.NotFoundPageWrapper>
      <Lottie
        options={notFoundPageLottieOptions}
        {...(getWidth > 500
          ? { height: '20rem', width: '40rem' }
          : { height: '18rem', width: '22rem' })}
      />
    </S.NotFoundPageWrapper>
  );
};
