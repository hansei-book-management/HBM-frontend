import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { Form } from '@/components';
import { LoginFormValues } from '@/api';
import { useFetchUser, useLogin } from '@/hooks';

import * as S from './styled';

export const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const { mutate } = useLogin();

  const { data: user, isFetching } = useFetchUser();
  const navigate = useNavigate();

  const onSubmit = ({ uid, passwd }: LoginFormValues) => {
    mutate({ uid, passwd });
  };

  useEffect(() => {
    if (user?.result) {
      navigate('/');
    }
  }, [user]);

  return (
    <>
      {!isFetching && !user?.result && (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.InputContainer inputTitle="아이디" errorMessage={errors.uid?.message}>
            <S.LoginInput
              type="text"
              {...register('uid', {
                required: '아이디는 필수입니다.',
                pattern: {
                  value: /^[a-zA-Z0-9가-힣]{5,20}$/,
                  message: '5~20자 한글 또는 영문, 숫자를 입력해주세요',
                },
              })}
              placeholder="아이디를 입력해주세요..."
            />
          </Form.InputContainer>
          <Form.InputContainer inputTitle="비밀번호" errorMessage={errors.passwd?.message}>
            <S.LoginInput
              type="password"
              {...register('passwd', {
                required: '비밀번호는 필수입니다.',
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/,
                  message: '8~16자 영문, 숫자, 특수문자 조합을 입력해주세요',
                },
              })}
              placeholder="비밀번호를 입력해주세요..."
            />
          </Form.InputContainer>
          <Form.Button>로그인</Form.Button>
          <div>
            <Form.LinkContainer>
              아직 계정이 없으신가요? <Link to="/auth/register">회원가입</Link>
            </Form.LinkContainer>
          </div>
        </Form>
      )}
    </>
  );
};
