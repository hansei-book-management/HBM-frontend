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
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.InputContainer inputTitle="동아리 이름" errorMessage={errors.clubName?.message}>
        <S.ClubApplyInput
          type="text"
          {...register('clubName', {
            required: '동아리 이름은 필수입니다.',
          })}
          placeholder="동아리 이름을 입력해주세요..."
        />
      </Form.InputContainer>
      <Form.InputContainer inputTitle="동아리 설명" errorMessage={errors.clubDescription?.message}>
        <S.ClubApplyInput
          type="text"
          {...register('clubDescription', {
            required: '동아리 설명은 필수입니다.',
          })}
          placeholder="무엇을 하는 동아리인지 입력해주세요..."
        />
      </Form.InputContainer>
      <Form.InputContainer inputTitle="부장 이름" errorMessage={errors.clubRepresentative?.message}>
        <S.ClubApplyInput
          type="text"
          {...register('clubRepresentative', {
            required: '부장 이름은 필수입니다.',
          })}
          placeholder="동아리 부장의 이름을 입력해주세요..."
        />
      </Form.InputContainer>
      <Form.InputContainer inputTitle="부원 수" errorMessage={errors.clubMemberNumber?.message}>
        <S.ClubApplyInput
          type="text"
          {...register('clubMemberNumber', {
            required: '부원 수는 필수입니다.',
          })}
          placeholder="동아리에 몇명의 부원이 있는지 입력해주세요..."
        />
      </Form.InputContainer>
      <Form.InputContainer
        inputTitle="부장 전화번호"
        errorMessage={errors.clubRepresentativePhone?.message}
      >
        <S.ClubApplyInput
          type="text"
          {...register('clubRepresentativePhone', {
            required: '동아리 부장 전화번호는 필수입니다.',
          })}
          placeholder="동아리 부장의 전화번호를 입력해주세요..."
        />
      </Form.InputContainer>
      <Form.Button phoneToken>신청하기</Form.Button>
    </Form>
  );
};
