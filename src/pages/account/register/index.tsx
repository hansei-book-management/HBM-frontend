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
  role: string;
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
        {INPUT_LIST.map(
          ({
            name,
            text,
            required,
            pattern,
            minValue,
            minValueMessage,
            maxValue,
            maxValueMessage,
          }) => (
            <S.RegisterInput
              {...register(`${name}`, {
                required: required,
                maxLength: {
                  value: maxValue,
                  message: maxValueMessage,
                },
                minLength: {
                  value: minValue,
                  message: minValueMessage,
                },
                pattern: pattern,
              })}
              placeholder={text}
            />
          ),
        )}
        <S.RegisterRoleSelect
          title="foo"
          {...register('role', {
            required: `역할 선택은 필수 입니다.`,
          })}
        >
          <option>부원</option>
          <option>부장</option>
        </S.RegisterRoleSelect>
        <S.RegisterButton>회원가입</S.RegisterButton>
      </S.RegisterContainer>
    </S.RegisterWrapper>
  );
};
