import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import * as S from './styled';

export interface RegisterFormValues {
  username: string;
  password: string;
  name: string;
  studentId: string;
  phone: string;
  phoneToken: string;
  verificationCode: string;
}

export const RegisterPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>();
  const [page, setPage] = useState(1);

  const nextClick = () => {
    setPage(page + 1);
  };

  const prevClick = () => {
    setPage(page - 1);
  };

  const onSubmit = (data: RegisterFormValues) => {
    console.log(data);
  };
  return (
    <S.RegisterWrapper>
      <S.RegisterContainer onSubmit={handleSubmit(onSubmit)}>
        <div>
          <S.RegisterInput
            {...register('username', {
              required: '아이디는 필수입니다.',
              maxLength: {
                value: 20,
                message: '아이디는 20자 이내로 입력해주세요.',
              },
              minLength: {
                value: 5,
                message: '아이디는 5자 이상 입력해주세요.',
              },
            })}
            placeholder="아이디를 입력해주세요..."
          />
          <S.RegisterErrorMessage>{errors.username?.message}</S.RegisterErrorMessage>
        </div>
        <div>
          <S.RegisterInput
            {...register('password', {
              required: '비밀번호는 필수입니다.',
              minLength: {
                value: 5,
                message: '비밀번호는 5자 이상 입력해주세요.',
              },
            })}
            placeholder="비밀번호를 입력해주세요..."
          />
          <S.RegisterErrorMessage>{errors.password?.message}</S.RegisterErrorMessage>
        </div>
        <div>
          <S.RegisterInput
            {...register('name', {
              required: '이름은 필수입니다.',
              maxLength: {
                value: 20,
                message: '이름은 20자 이내로 입력해주세요.',
              },
              minLength: {
                value: 2,
                message: '이름은 2자 이상 입력해주세요.',
              },
            })}
            placeholder="이름을 입력해주세요..."
          />
          <S.RegisterErrorMessage>{errors.name?.message}</S.RegisterErrorMessage>
        </div>
        <div>
          <S.RegisterInput
            {...register('studentId', {
              required: '학번 필수입니다.',
              maxLength: {
                value: 5,
                message: '학번은 5자 입니다.',
              },
              minLength: {
                value: 5,
                message: '학번은 5자 입니다.',
              },
            })}
            placeholder="학번을 입력해주세요..."
          />
          <S.RegisterErrorMessage>{errors.studentId?.message}</S.RegisterErrorMessage>
        </div>
        <S.RegisterButton>회원가입</S.RegisterButton>
      </S.RegisterContainer>
    </S.RegisterWrapper>
  );
};
