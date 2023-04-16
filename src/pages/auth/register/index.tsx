import { useForm } from 'react-hook-form';
import { useState } from 'react';

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
  const [page, setPage] = useState(1);

  const onNextPage = () => {
    if (page === 1) {
      setPage((prev) => prev + 1);
    }
  };

  const onPrevPage = () => {
    if (page === 2) {
      setPage((prev) => prev - 1);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>();

  const onSubmit = (formData: FormProps) => {
    console.log('hello');
  };

  const renderInputs = (start: number, end: number) =>
    INPUT_LIST.slice(start, end).map(
      ({ name, text, required, pattern, minValue, minValueMessage, maxValue, maxValueMessage }) => (
        <S.RegisterInput
          key={name}
          {...register(name, {
            required,
            maxLength: { value: maxValue, message: maxValueMessage },
            minLength: { value: minValue, message: minValueMessage },
            pattern,
          })}
          placeholder={text}
        />
      ),
    );

  return (
    <S.RegisterWrapper>
      {page === 2 ? (
        <S.RegisterBackButton onClick={onPrevPage}>&larr;</S.RegisterBackButton>
      ) : (
        <div></div>
      )}
      <S.RegisterContainer onSubmit={handleSubmit(onSubmit)}>
        {page === 1 && (
          <>
            <S.RegisterRoleSelect
              title="foo"
              {...register('role', { required: '역할 선택은 필수입니다.' })}
            >
              <option>부원</option>
              <option>부장</option>
            </S.RegisterRoleSelect>
            {renderInputs(0, 3)}
          </>
        )}
        {page === 2 && renderInputs(3, 6)}
        <S.RegisterButton onClick={page === 1 ? onNextPage : undefined}>
          {page === 1 ? '다음' : '회원가입'}
        </S.RegisterButton>
      </S.RegisterContainer>
    </S.RegisterWrapper>
  );
};
