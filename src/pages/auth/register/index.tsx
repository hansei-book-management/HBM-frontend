import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { Form } from '@/components';
import { RegisterFormValues } from '@/api';
import { useRegister } from '@/hooks';

import * as S from './styled';

export interface RegisterInputProps {
  type: string;
}

export interface RegisterInputListProps {
  inputTitle: string;
  errorMessage?: string;
  inputProps: RegisterInputProps;
  placeHolder: string;
}

export interface RegisterFormValue extends RegisterFormValues {
  passwdCheck: string;
}

export const RegisterPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormValue>();

  const password = useRef({});
  password.current = watch('passwd');
  const { mutate: registerMutate } = useRegister();

  const onSubmitHandler = ({ uid, passwd, name, num, phone }: RegisterFormValues) => {
    registerMutate({
      uid,
      passwd,
      name,
      num,
      phone,
    });
  };
  const REGISTER_INPUT_LIST: RegisterInputListProps[] = [
    {
      inputTitle: '아이디',
      errorMessage: errors.uid?.message,
      inputProps: {
        type: 'text',
        ...register('uid', {
          required: '아이디는 필수입니다.',
          pattern: {
            value: /^[a-zA-Z0-9가-힣]{5,20}$/,
            message: '5~20자 한글 또는 영문, 숫자를 입력해주세요',
          },
        }),
      },
      placeHolder: '아이디를 입력해주세요...',
    },
    {
      inputTitle: '비밀번호',
      errorMessage: errors.passwd?.message,
      inputProps: {
        type: 'password',
        ...register('passwd', {
          required: '비밀번호는 필수입니다.',
          pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/,
            message: '8~16자 영문, 숫자, 특수문자 조합을 입력해주세요',
          },
        }),
      },
      placeHolder: '비밀번호를 입력해주세요...',
    },
    {
      inputTitle: '비밀번호 확인',
      errorMessage: errors.passwdCheck?.message,
      inputProps: {
        type: 'password',
        ...register('passwdCheck', {
          required: '비밀번호 확인은 필수입니다.',
          pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/,
            message: '8~16자 영문, 숫자, 특수문자 조합을 입력해주세요',
          },
          validate: (value) => value === password.current || '입력한 비밀번호와 일치하지 않습니다.',
        }),
      },
      placeHolder: '비밀번호를 다시 한번 확인해주세요...',
    },
    {
      inputTitle: '이름',
      errorMessage: errors.name?.message,
      inputProps: {
        type: 'text',
        ...register('name', {
          required: '이름은 필수입니다.',
          pattern: {
            value: /^[가-힣]{2,10}$/,
            message: '2~10자 한글을 입력해주세요',
          },
        }),
      },
      placeHolder: '이름을 입력해주세요...',
    },
    {
      inputTitle: '학번',
      errorMessage: errors.num?.message,
      inputProps: {
        type: 'text',
        ...register('num', {
          required: '학번은 필수입니다.',
          pattern: {
            value: /^([NCMGH])([123])([123])([012][1-9])$/,
            message: '학번 형식이 올바르지 않습니다.',
          },
        }),
      },
      placeHolder: '학번을 입력해주세요...',
    },
    {
      inputTitle: '전화번호',
      errorMessage: errors.phone?.message,
      inputProps: {
        type: 'text',
        ...register('phone', {
          required: '전화번호는 필수입니다.',
          pattern: {
            value: /01[0-1, 7][0-9]{7,8}$/,
            message: '전화번호 형식이 올바르지 않습니다.',
          },
        }),
      },
      placeHolder: '전화번호를 입력해주세요...',
    },
  ];

  return (
    <Form onSubmit={handleSubmit(onSubmitHandler)}>
      {REGISTER_INPUT_LIST.map(({ inputTitle, errorMessage, inputProps, placeHolder }) => (
        <Form.InputContainer inputTitle={inputTitle} errorMessage={errorMessage} key={inputTitle}>
          <S.RegisterInput {...inputProps} placeholder={placeHolder} />
        </Form.InputContainer>
      ))}
      <Form.Button>회원가입</Form.Button>
      <div>
        <Form.LinkContainer>
          이미 계정이 있으신가요? <Link to="/auth/login">로그인</Link>
        </Form.LinkContainer>
      </div>
    </Form>
  );
};
