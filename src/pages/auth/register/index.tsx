import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { useRecoilState, useRecoilValue } from 'recoil';

import { useRegister, useRegisterPhone } from '@/hooks/query/useAuth';
import { PhoneToken } from '@/atoms';
import { VerificationCode } from '@/atoms/verificatoinCode';
import { Form } from '@/components';

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

export interface RegisterFormValues {
  username: string;
  password: string;
  name: string;
  studentId: string;
  phoneToken: string;
  verificationCode: string;
}

type RegisterFormProps = RegisterFormValues & {
  passwordCheck: string;
  phone: string;
};

export const RegisterPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormProps>();

  const [phoneAccessToken, setPhoneAccessToken] = useRecoilState(PhoneToken);
  const verificationCode = useRecoilValue(VerificationCode);

  const password = useRef({});
  password.current = watch('password');
  const { mutate: registerMutate } = useRegister();
  const { mutate: phoneMutate } = useRegisterPhone();

  const onSubmitHandler = ({
    username,
    password,
    name,
    studentId,
    verificationCode,
  }: RegisterFormValues) => {
    if (phoneAccessToken.state) {
      registerMutate({
        username,
        password,
        name,
        studentId,
        phoneToken: phoneAccessToken.token,
        verificationCode,
      });
    } else {
      return;
    }
  };

  const onPhoneSubmitHandler = ({ phone }: RegisterFormProps) => {
    phoneMutate(phone);
  };

  const REGISTER_INPUT_LIST: RegisterInputListProps[] = [
    {
      inputTitle: '아이디',
      errorMessage: errors.username?.message,
      inputProps: {
        type: 'text',
        ...register('username', {
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
      errorMessage: errors.password?.message,
      inputProps: {
        type: 'password',
        ...register('password', {
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
      errorMessage: errors.passwordCheck?.message,
      inputProps: {
        type: 'password',
        ...register('passwordCheck', {
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
      errorMessage: errors.studentId?.message,
      inputProps: {
        type: 'text',
        ...register('studentId', {
          required: '학번 필수입니다.',
          pattern: {
            value: /^([NCMGH])([123])([123])([012][1-9])$/,
            message: '학번 형식이 올바르지 않습니다.',
          },
        }),
      },
      placeHolder: '학번을 입력해주세요...',
    },
  ];

  useEffect(() => {
    console.log(phoneAccessToken.state);
    setPhoneAccessToken({ state: false, token: '' });
  }, []);

  return (
    <Form onSubmit={handleSubmit(onSubmitHandler)}>
      {REGISTER_INPUT_LIST.map(({ inputTitle, errorMessage, inputProps, placeHolder }) => (
        <Form.InputContainer inputTitle={inputTitle} errorMessage={errorMessage} key={inputTitle}>
          <S.RegisterInput {...inputProps} placeholder={placeHolder} />
        </Form.InputContainer>
      ))}
      <Form.InputContainer inputTitle="전화번호" errorMessage={errors.phone?.message}>
        <S.RegisterPhoneInputContainer>
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
          <div>
            <S.RegisterPhoneRequestButton onClick={handleSubmit(onPhoneSubmitHandler)}>
              요청
            </S.RegisterPhoneRequestButton>
          </div>
        </S.RegisterPhoneInputContainer>
      </Form.InputContainer>
      {phoneAccessToken.state && (
        <Form.InputContainer
          inputTitle="인증번호"
          errorMessage={errors.verificationCode?.message || verificationCode.message}
        >
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
        </Form.InputContainer>
      )}
      <Form.Button phoneToken={phoneAccessToken.state}>
        {phoneAccessToken.state ? '회원가입' : '전화번호 인증 후 가능해요.'}
      </Form.Button>
      <div>
        <Form.LinkContainer>
          이미 계정이 있으신가요? <Link to="/auth/login">로그인</Link>
        </Form.LinkContainer>
      </div>
    </Form>
  );
};
