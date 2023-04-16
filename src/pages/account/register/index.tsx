import { useForm } from 'react-hook-form';

import { INPUT_LIST } from '@/constant/input';

import * as S from './styled';

export interface FormProps {
  errors: {
    id: {
      message: string;
    };
    name: {
      message: string;
    };
    studentId: {
      message: string;
    };
    phoneNumber: {
      message: string;
    };
    password: {
      message: string;
    };
    passwordCheck: {
      message: string;
    };
    club: {
      message: string;
    };
  };
  id: string;
  name: string;
  studentId: string;
  phoneNumber: string;
  password: string;
  passwordCheck: string;
  club: string;
}

export const RegisterPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormProps>();

  const onValid = (formData: FormProps) => {
    console.log('hello');
  };

  return (
    <S.RegisterWrapper>
      <S.RegisterContainer onSubmit={handleSubmit(onValid)}>
        {/* <S.RegisterInput placeholder="아이디를 입력하세요..." />
        <S.RegisterInput placeholder="이름을 입력하세요..." />
        <S.RegisterInput placeholder="학번을 입력하세요..." />
        <S.RegisterInput placeholder="전화번호를 입력하세요..." />
        <S.RegisterInput placeholder="비밀번호를 입력하세요..." />
        <S.RegisterInput placeholder="비밀번호 확인을 입력하세요..." />
        <S.RegisterInput placeholder="자신의 역할을 선택해 주세요..." /> */}
        {INPUT_LIST.map(({ name, text, required, pattern, minValue, maxValue }) => (
          <S.RegisterInput
            {...register(`${name}`, {
              required: required,
              maxLength: {
                value: maxValue,
                message: 'asdf',
              },
            })}
          />
        ))}
        <S.RegisterButton>회원가입</S.RegisterButton>
      </S.RegisterContainer>
    </S.RegisterWrapper>
  );
};
