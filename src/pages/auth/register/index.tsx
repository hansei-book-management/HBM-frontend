import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { INPUT_LIST } from '@/constant/input';

import * as S from './styled';

// 부장이면 동아리 이름을 입력
// 부원이면 동아리 이름을 선택
export interface FormProps {
  role: string;
  clubName: string;
  name: string;
  studentId: string;
  phoneNumber: string;
  id: string;
  password: string;
  passwordCheck: string;
}

export const RegisterPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>();

  const [page, setPage] = useState(1);

  const onNextPage = () => {
    // if (page === 1) {
    //   setPage((prev) => prev + 1);
    // }
  };

  const onPrevPage = () => {
    if (page === 2) {
      setPage((prev) => prev - 1);
    }
  };

  const onNext = (formData: FormProps) => {
    console.log(formData);
  };

  const onValid = (formData: FormProps) => {
    console.log(formData);
  };

  const renderInputs = (start: number, end: number) =>
    INPUT_LIST.slice(start, end).map(
      ({ name, text, required, pattern, minValue, minValueMessage, maxValue, maxValueMessage }) => (
        <div>
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
          <S.RegisterErrorMessage>{errors[name]?.message}</S.RegisterErrorMessage>
        </div>
      ),
    );

  return (
    <S.RegisterWrapper>
      {page === 2 ? (
        <S.RegisterBackButton onClick={onPrevPage}>&larr;</S.RegisterBackButton>
      ) : (
        <div></div>
      )}
      <S.RegisterContainer onSubmit={handleSubmit(onNext)}>
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
        <S.RegisterButton onClick={page === 1 ? onNextPage : handleSubmit(onValid)}>
          {page === 1 ? '다음' : '회원가입'}
        </S.RegisterButton>
      </S.RegisterContainer>
    </S.RegisterWrapper>
  );
};
