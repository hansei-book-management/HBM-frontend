import React from 'react';
import Lottie from 'react-lottie';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useRecoilState } from 'recoil';

import { loadingLottieOptions } from '@/constant';
import { useAddUserClub } from '@/hooks';
import { AddClubFormValues } from '@/api';
import { addUserClubModal } from '@/atoms';
import { Modal, StatusModal } from '@/components/modal';

import * as S from './styled';

export interface AddClubModalProps {
  url: string;
}

export const AddClubModal: React.FC<AddClubModalProps> = ({ url }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddClubFormValues>();
  const [addClubModal, setAddClubModal] = useRecoilState(addUserClubModal);

  const { mutate } = useAddUserClub();

  const onSubmit = ({ clubCode }: AddClubFormValues) => {
    mutate({ clubCode });
  };

  const navigate = useNavigate();

  const onAddClubModalClose = () => {
    setAddClubModal({ state: false });
    navigate(`${url}`);
  };

  if (addClubModal.state && addClubModal.isOk === null) {
    return (
      <Modal.OverLay>
        <Modal
          textProps={
            <S.ModalContainer>
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
            addClubModal.isLoading === true ? (
              <Lottie options={loadingLottieOptions} height={'1.2rem'} width={'2.6rem'} />
            ) : (
              '등록'
            )
          }
          modalSize="medium"
          statusDisable={addClubModal.isLoading === true}
          {...(!addClubModal.isLoading &&
            !errors.clubCode?.message && {
              leftButtonClick: () => onAddClubModalClose(),
            })}
          handleSubmit={handleSubmit}
          onValid={onSubmit}
        />
      </Modal.OverLay>
    );
  }
  if (addClubModal.state && addClubModal.isOk === true) {
    return (
      <StatusModal
        url={`${url}`}
        title={'추가 성공'}
        isOk={true}
        message={
          <>
            <S.StatusModalText>
              {addClubModal.data} 동아리 도서가 추가되었어요.
              <br />
              앞으로 {addClubModal.data} 동아리 도서를 대여할 수 있어요.
              <br />내 도서에서 확인해보세요.
            </S.StatusModalText>
          </>
        }
        onCloseModal={onAddClubModalClose}
      />
    );
  }
  if (addClubModal.state && addClubModal.isOk === false) {
    return (
      <StatusModal
        url={`${url}`}
        title={'추가 실패'}
        isOk={false}
        message={
          <>
            <S.StatusModalText>
              {addClubModal.data}
              <br />
              시스템 상의 문제로 인하여 동아리 도서 추가에 실패하였어요.
              <br />
              빠른 시일내에 복구될 예정이니 잠시만 기다려주세요.
            </S.StatusModalText>
          </>
        }
        onCloseModal={onAddClubModalClose}
      />
    );
  }
  return null;
};
