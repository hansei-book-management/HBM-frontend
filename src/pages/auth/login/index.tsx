import React from 'react';
import { useForm } from 'react-hook-form';

import * as S from './styled';

export interface LoginFormValues {
  username: string;
  password: string;
}

export const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<LoginFormValues>();

  return (
    <S.LoginPageWrapper>
      <S.LoginPageContainer>
        <S.LoginPageInputContainer>
          <S.LoginPageInputTitle>아이디</S.LoginPageInputTitle>
          <S.LoginPageInput
            type="text"
            {...register('username', {
              required: '아이디는 필수입니다.',
              pattern: {
                value: /^[a-zA-Z0-9가-힣]{5,20}$/,
                message: '5~20자 한글 또는 영문, 숫자를 입력해주세요',
              },
            })}
            placeholder="아이디를 입력해주세요..."
          />
          <S.LoginPageErrorMessage>{errors.username?.message}</S.LoginPageErrorMessage>
        </S.LoginPageInputContainer>
        <S.LoginPageInputContainer>
          <S.LoginPageInputTitle>비밀번호</S.LoginPageInputTitle>
          <S.LoginPageInput
            type="password"
            {...register('password', {
              required: '비밀번호는 필수입니다.',
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/,
                message: '8~16자 영문, 숫자, 특수문자 조합을 입력해주세요',
              },
            })}
            placeholder="비밀번호를 입력해주세요..."
          />
          <S.LoginPageErrorMessage>{errors.password?.message}</S.LoginPageErrorMessage>
          <S.LoginPageFormButton>로그인</S.LoginPageFormButton>
        </S.LoginPageInputContainer>
      </S.LoginPageContainer>
    </S.LoginPageWrapper>
  );
};
