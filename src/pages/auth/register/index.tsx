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
    setValue,
  } = useForm<RegisterFormValues>();

  const password = useRef({});
  password.current = watch('password');

  const [page, setPage] = useState(1);

  const onPrevClick = () => {
    setPage(Math.max(page - 1, 1));
  };

  const onSubmit = (data: RegisterFormValues) => {
    if (page === 1) {
      setValue('phone', '');
      setValue('phoneToken', '');
      setValue('verificationCode', '');
      setPage(page + 1);
    } else {
      console.log(data);
    }
  };

  const registerStep1 = () => {
    return (
      <>
        <S.RegisterInputContainer>
          <S.RegisterInputTitle>아이디</S.RegisterInputTitle>
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
        </S.RegisterInputContainer>
        <S.RegisterInputContainer>
          <S.RegisterInputTitle>비밀번호</S.RegisterInputTitle>
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
        </S.RegisterInputContainer>
        <S.RegisterInputContainer>
          <S.RegisterInputTitle>비밀번호 확인</S.RegisterInputTitle>
          <S.RegisterInput
            type="password"
            {...register('passwordCheck', {
              required: '비밀번호 확인은 필수입니다.',
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
        </S.RegisterInputContainer>
        <S.RegisterInputContainer>
          <S.RegisterInputTitle>이름</S.RegisterInputTitle>
          <S.RegisterInput
            type="text"
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
        </S.RegisterInputContainer>
        <S.RegisterInputContainer>
          <S.RegisterInputTitle>학번</S.RegisterInputTitle>
          <S.RegisterInput
            type="text"
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
                value: /^[NCGH][1-3][1-2][0-9]{2}$/, // 이 코드를 해석하면 NCGH로 시작하고 1~3학년 1~2반 0~30번까지의 학번을 입력하라는 뜻입니다.
                message: '학번 형식이 올바르지 않습니다.',
              },
            })}
            placeholder="학번을 입력해주세요..."
          />
          <S.RegisterErrorMessage>{errors.studentId?.message}</S.RegisterErrorMessage>
        </S.RegisterInputContainer>
      </>
    );
  };

  const registerStep2 = () => {
    return (
      <>
        <S.RegisterInputContainer>
          <S.RegisterInputTitle>전화번호</S.RegisterInputTitle>
          <S.RegisterInput
            type="phone"
            {...register('phone', {
              required: '전화번호는 필수입니다.',
              pattern: {
                value: /01[0-1, 7][0-9]{7,8}$/,
                message: '전화번호가 잘못되었습니다. 다시 입력해주세요.',
              },
            })}
            placeholder="전화번호를 입력해주세요..."
          />
          <S.RegisterErrorMessage>{errors.username?.message}</S.RegisterErrorMessage>
        </S.RegisterInputContainer>
        <S.RegisterInputContainer>
          <S.RegisterInputTitle>전화번호 토큰</S.RegisterInputTitle>
          <S.RegisterInput
            type="text"
            {...register('phoneToken', {
              required: '전화번호 토큰은 필수입니다.',
              pattern: {
                value: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[8|9aAbB][0-9a-f]{3}-[0-9a-f]{12}$/,
                message: '전화번호 토큰이 잘못되었습니다. 다시 입력해주세요.',
              },
            })}
            placeholder="전화번호 토큰을 입력해주세요..."
          />
          <S.RegisterErrorMessage>{errors.phoneToken?.message}</S.RegisterErrorMessage>
        </S.RegisterInputContainer>
        <S.RegisterInputContainer>
          <S.RegisterInputTitle>인증번호</S.RegisterInputTitle>
          <S.RegisterInput
            type="text"
            {...register('verificationCode', {
              required: '인증번호는 필수입니다.',
              pattern: {
                value: /^[0-9]{6}$/,
                message: '인증번호가 잘못되었습니다. 다시 입력해주세요.',
              },
            })}
            placeholder="인증번호를 입력해주세요..."
          />
          <S.RegisterErrorMessage>{errors.verificationCode?.message}</S.RegisterErrorMessage>
        </S.RegisterInputContainer>
      </>
    );
  };

  return (
    <S.RegisterWrapper>
      <S.RegisterBackButton style={{ opacity: page > 1 ? 1 : 0 }} onClick={onPrevClick}>
        &larr;
      </S.RegisterBackButton>
      <S.RegisterContainer onSubmit={handleSubmit(onSubmit)}>
        {page === 1 ? registerStep1() : registerStep2()}
        <S.RegisterButton>{page === 1 ? '다음' : '회원가입'}</S.RegisterButton>
      </S.RegisterContainer>
    </S.RegisterWrapper>
  );
};
