import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import * as S from './styled';

export interface RegisterFormValues {
  username: string;
  password: string;
  passwordCheck: string;
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
    watch,
  } = useForm<RegisterFormValues>();

  const password = useRef({});
  password.current = watch('password', '');

  const [page, setPage] = useState(1);

  const onPrevClick = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const onSubmit = (data: RegisterFormValues) => {
    if (page === 1) {
      setPage(page + 1);
    } else {
      console.log(data);
    }
  };
  return (
    <S.RegisterWrapper>
      {page === 2 ? (
        <S.RegisterBackButton onClick={onPrevClick}>&larr;</S.RegisterBackButton>
      ) : (
        <S.RegisterBackButton style={{ opacity: '0' }}>&larr;</S.RegisterBackButton>
      )}
      <S.RegisterContainer onSubmit={handleSubmit(onSubmit)}>
        <div>
          <S.RegisterInput
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
          <S.RegisterErrorMessage>{errors.username?.message}</S.RegisterErrorMessage>
        </div>
        <div>
          <S.RegisterInput
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
          <S.RegisterErrorMessage>{errors.password?.message}</S.RegisterErrorMessage>
        </div>
        <div>
          <S.RegisterInput
            type="passwordCheck"
            {...register('passwordCheck', {
              required: '비밀번호 확인을 입력해주세요.',
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/,
                message: '8~16자 영문, 숫자, 특수문자 조합을 입력해주세요',
              },
              validate: (value) =>
                value === password.current || '입력한 비밀번호와 일치하지 않습니다.',
            })}
            placeholder="비밀번호를 다시 한번 확인해주세요..."
          />
          <S.RegisterErrorMessage>{errors.passwordCheck?.message}</S.RegisterErrorMessage>
        </div>
        <div>
          <S.RegisterInput
            {...register('name', {
              required: '이름은 필수입니다.',
              pattern: {
                value: /^[가-힣]{2,10}$/,
                message: '2~10자 한글을 입력해주세요',
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
              pattern: {
                value: /^[NCGH][1-3][1-2][0-30]$/, // 이 코드를 해석하면 NCGH로 시작하고 1~3학년 1~2반 0~30번까지의 학번을 입력하라는 뜻입니다.
                message: '학번 형식이 올바르지 않습니다.',
              },
            })}
            placeholder="학번을 입력해주세요..."
          />
          <S.RegisterErrorMessage>{errors.studentId?.message}</S.RegisterErrorMessage>
        </div>
        <S.RegisterButton>{page === 1 ? '다음' : '회원가입'}</S.RegisterButton>
      </S.RegisterContainer>
    </S.RegisterWrapper>
  );
};
