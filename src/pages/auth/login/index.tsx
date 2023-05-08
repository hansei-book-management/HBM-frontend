import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

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

  const onSubmit = (data: LoginFormValues) => {
    console.log(data);
  };

  return (
    <S.LoginWrapper>
      <S.LoginContainer onSubmit={handleSubmit(onSubmit)}>
        <S.LoginInputContainer>
          <S.LoginInputTitle>아이디</S.LoginInputTitle>
          <S.LoginInput
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
          <S.LoginErrorMessage>{errors.username?.message}</S.LoginErrorMessage>
        </S.LoginInputContainer>
        <S.LoginInputContainer>
          <S.LoginInputTitle>비밀번호</S.LoginInputTitle>
          <S.LoginInput
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
          <S.LoginErrorMessage>{errors.password?.message}</S.LoginErrorMessage>
        </S.LoginInputContainer>
        <div>
          <S.LoginFormButton>로그인</S.LoginFormButton>
          <S.LoginLinkContainer>
            이미 계정이 있으신가요? <Link to="/auth/register">회원가입</Link>
          </S.LoginLinkContainer>
        </div>
      </S.LoginContainer>
    </S.LoginWrapper>
  );
};
