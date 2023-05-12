import React from 'react';
import { useForm } from 'react-hook-form';

import { Form } from '@/components';

import * as S from './styled';

export interface ClubApplyFormValues {
  clubName: string;
  clubDescription: string;
  clubRepresentative: string;
  clubMemberNumber: string;
  clubRepresentativePhone: string;
  clubRepresentativeEmail: string;
}

export const ClubApplyPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClubApplyFormValues>();

  const onSubmit = (data: ClubApplyFormValues) => {
    console.log(data);
  };

  return (
    <S.ClubApplyWrapper>
      <Form onSubmit={handleSubmit(onSubmit)} phoneToken buttonChildren="신청하기">
        <Form.InputContainer inputTitle="동아리 이름" errorMessage={errors.clubName?.message}>
          <S.ClubApplyInput
            type="text"
            {...register('clubName', {
              required: '동아리 이름은 필수입니다.',
            })}
            placeholder="동아리 이름을 입력해주세요..."
          />
        </Form.InputContainer>
      </Form>
    </S.ClubApplyWrapper>
  );
};
