import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { Form } from '@/components';
import { ClubApplyFormValue } from '@/api';
import { useCreateClub, useFetchUser } from '@/hooks';

import * as S from './styled';

export interface ClubApplyInputProps {
  type: string;
}

export interface ClubApplyListProps {
  inputTitle: string;
  errorMessage?: string;
  inputProps: ClubApplyInputProps;
  placeHolder: string;
}

export interface ClubApplyFormValues extends ClubApplyFormValue {
  clubDescription: string;
  clubRepresentative: string;
  clubMemberNumber: string;
}

export const ClubApplyPage: React.FC = () => {
  const { data, isLoading } = useFetchUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClubApplyFormValues>();

  const { mutate: addClubMutate } = useCreateClub();

  const onSubmit = ({ name }: ClubApplyFormValue) => {
    addClubMutate({ name });
  };

  const CLUB_INPUT_LIST: ClubApplyListProps[] = [
    {
      inputTitle: '동아리 이름',
      errorMessage: errors.name?.message,
      inputProps: {
        type: 'text',
        ...register('name', {
          required: '동아리 이름은 필수입니다.',
          pattern: {
            value: /^[a-zA-Z0-9가-힣]{3,20}$/,
            message: '3~20자 한글 또는 영문, 숫자를 입력해주세요',
          },
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
  ];

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && data?.result.role === 'director') {
      navigate('/');
      toast.error('동아리 부장은 동아리를 신청할 수 없습니다.', {
        autoClose: 3000,
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  }, []);

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
