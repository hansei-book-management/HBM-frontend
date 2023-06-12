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

export interface ClubApplyInputProps {
  type: string;
}

export interface ClubApplyListProps {
  inputTitle: string;
  errorMessage?: string;
  inputProps: ClubApplyInputProps;
  placeHolder: string;
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

  const CLUB_INPUT_LIST: ClubApplyListProps[] = [
    {
      inputTitle: '동아리 이름',
      errorMessage: errors.clubName?.message,
      inputProps: {
        type: 'text',
        ...register('clubName', {
          required: '동아리 이름은 필수입니다.',
        }),
      },
      placeHolder: '동아리 이름을 입력해주세요...',
    },
    {
      inputTitle: '동아리 설명',
      errorMessage: errors.clubDescription?.message,
      inputProps: {
        type: 'text',
        ...register('clubDescription', {
          required: '동아리 설명은 필수입니다.',
        }),
      },
      placeHolder: '무엇을 하는 동아리인지 입력해주세요...',
    },
    {
      inputTitle: '부장 이름',
      errorMessage: errors.clubRepresentative?.message,
      inputProps: {
        type: 'text',
        ...register('clubRepresentative', {
          required: '부장 이름은 필수입니다.',
        }),
      },
      placeHolder: '동아리 부장의 이름을 입력해주세요...',
    },
    {
      inputTitle: '부원 수',
      errorMessage: errors.clubMemberNumber?.message,
      inputProps: {
        type: 'text',
        ...register('clubMemberNumber', {
          required: '부원 수은 필수입니다.',
        }),
      },
      placeHolder: '동아리에 몇명의 부원이 있는지 입력해주세요...',
    },
    {
      inputTitle: '부장 전화번호',
      errorMessage: errors.clubRepresentativePhone?.message,
      inputProps: {
        type: 'text',
        ...register('clubRepresentativePhone', {
          required: '부장 전화번호은 필수입니다.',
        }),
      },
      placeHolder: '동아리 부장의 전화번호를 입력해주세요...',
    },
  ];

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {CLUB_INPUT_LIST.map(({ inputTitle, errorMessage, inputProps, placeHolder }) => (
        <Form.InputContainer inputTitle={inputTitle} errorMessage={errorMessage} key={inputTitle}>
          <S.ClubApplyInput {...inputProps} placeholder={placeHolder} />
        </Form.InputContainer>
      ))}
      <Form.Button>신청하기</Form.Button>
    </Form>
  );
};
