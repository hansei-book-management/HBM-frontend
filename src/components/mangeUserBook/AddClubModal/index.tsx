import React from 'react';
import Lottie from 'react-lottie';
import { useForm } from 'react-hook-form';

import { loadingLottieOptions } from '@/constant';

import { Modal } from '../../modal/CommonModal';
import { StatusModal } from '../../modal/StatusModal';

import * as S from './styled';

export interface AddClubFormValues {
  clubCode: string;
}

export interface AddClubModalProps {
  modalActive: boolean;
  addClubModalActive: {
    isOk: boolean;
    state: boolean;
  };
  nextButtonClick: () => void;
  doneButtonClick: () => void;
  loading: boolean;
  url: string;
}

export const AddClubModal: React.FC<AddClubModalProps> = ({
  modalActive,
  addClubModalActive: { isOk, state },
  nextButtonClick,
  doneButtonClick,
  loading,
  url,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddClubFormValues>();

  const onValid = ({ clubCode }: AddClubFormValues) => {
    console.log(clubCode, '동아리 코드');
  };
  if (modalActive && !isOk && state) {
    return (
      <Modal.OverLay>
        <Modal
          textProps={
            <S.ModalContainer onSubmit={handleSubmit(onValid)}>
              <S.ModalTitle>동아리 회원 등록</S.ModalTitle>
              <S.ModalAddClubInputContainer>
                <S.AddClubModalInputText>인증키 입력</S.AddClubModalInputText>
                <S.AddClubModalInput
                  {...register('clubCode', {
                    required: '동아리 인증키 입력은 필수 입니다.',
                  })}
                  placeholder="동아리 인증키를 입력해주세요..."
                />
                {errors.clubCode?.message && (
                  <S.AddClubModalFormErrorMessage>
                    {errors.clubCode.message}
                  </S.AddClubModalFormErrorMessage>
                )}
              </S.ModalAddClubInputContainer>
            </S.ModalContainer>
          }
          leftButtonText="취소"
          rightButtonText={
            loading ? (
              <Lottie options={loadingLottieOptions} height={'1.2rem'} width={'2.6rem'} />
            ) : (
              '등록'
            )
          }
          modalSize="medium"
          statusDisable={loading}
          {...(!loading &&
            !errors.clubCode?.message && {
              nextButtonClick: () => nextButtonClick(),
              doneButtonClick: () => doneButtonClick(),
            })}
        />
      </Modal.OverLay>
    );
  }
  if (modalActive && isOk && state) {
    return (
      <StatusModal
        url={`${url}`}
        {...(isOk
          ? {
              title: '추가 성공',
              isOk: true,
              message: (
                <>
                  <S.StatusModalText>
                    보안관제 동아리 도서가 추가되었어요.
                    <br />
                    앞으로 보안관제 동아리 도서를 대여할 수 있어요.
                    <br />내 도서에서 확인해보세요.
                  </S.StatusModalText>
                </>
              ),
            }
          : {
              title: '추가 실패',
              isOk: false,
              message: (
                <>
                  <S.StatusModalText>
                    보안관제 동아리 도서가 추가되었어요.
                    <br />
                    앞으로 보안관제 동아리 도서를 대여할 수 있어요.
                    <br />내 도서에서 확인해보세요.
                  </S.StatusModalText>
                </>
              ),
            })}
      />
    );
  }
  return null;
};
