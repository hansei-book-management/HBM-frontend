import React from 'react';
import Lottie from 'react-lottie';

import { NotFoundLottieOptions } from '@/constant';

import * as S from './styled';

export const NotFoundPage: React.FC = () => {
  return (
    <S.NotFoundPageWrapper>
      <Lottie options={NotFoundLottieOptions} height={'20rem'} width={'40rem'} />
    </S.NotFoundPageWrapper>
  );
};
