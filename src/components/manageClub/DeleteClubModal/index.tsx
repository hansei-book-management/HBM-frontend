import React from 'react';
import Lottie from 'react-lottie';

import { ClubModalProps } from '@/pages';
import { Modal, StatusModal } from '@/components';
import { MANAGE_CLUB, loadingLottieOptions } from '@/constant';

import * as S from './styled';

export interface DeleteClubModalProps {
  onDeleteClubModalClose: () => void;
  onDeleteClubStatusModalOpen: () => void;
  deleteClubModal: ClubModalProps;
}

export const DeleteClubModal: React.FC<DeleteClubModalProps> = ({
  onDeleteClubModalClose,
  onDeleteClubStatusModalOpen,
  deleteClubModal,
}) => {
  if (deleteClubModal.state && deleteClubModal.isOk === null) {
    return (
      <Modal.OverLay>
        <Modal
          textProps={
            <S.ModalContainer>
              <S.ModalTitle>삭제 진행</S.ModalTitle>
              <S.ModalDescription>
                정말로 '보안관제' 동아리를 삭제할까요?
                <br />
                삭제된 동아리의 도서는 더 이상 대여할 수 없어요.
              </S.ModalDescription>
            </S.ModalContainer>
          }
          modalSize="medium"
          leftButtonText="아니요"
          statusDisable={deleteClubModal.isLoading}
          rightButtonText={
            deleteClubModal.isLoading ? (
              <Lottie options={loadingLottieOptions} height={'1.2rem'} width={'2.6rem'} />
            ) : (
              '삭제할게요'
            )
          }
          isRed={true}
          {...(!deleteClubModal.isLoading && {
            leftButtonClick: () => onDeleteClubModalClose(),
            rightButtonClick: () => onDeleteClubStatusModalOpen(),
          })}
        />
      </Modal.OverLay>
    );
  }
  if (deleteClubModal.state && deleteClubModal.isOk === true) {
    return (
      <StatusModal
        url={`${MANAGE_CLUB}`}
        title={'삭제 완료'}
        isOk={true}
        message={
          <>
            <S.StatusModalText>
              '보안관제' 동아리가 삭제 되었어요.
              <br />
              앞으로 '보안관제' 동아리의 도서를 대여할 수 없어요.
              <br />
              그리고 부장이었던 '최근원'님은 이제 일반 회원이 되었어요.
            </S.StatusModalText>
          </>
        }
        onCloseModal={onDeleteClubModalClose}
      />
    );
  }
  if (deleteClubModal.state && deleteClubModal.isOk === false) {
    return (
      <StatusModal
        url={`${MANAGE_CLUB}`}
        title={'삭제 실패'}
        isOk={false}
        message={
          <>
            <S.StatusModalText>
              '보안관제' 동아리가 삭제에 실패했어요.
              <br />
              시스템 상의 문제로 동아리 삭제에 실패하였어요.
              <br />
              빠른 시일내에 복구될 예정이니 잠시만 기다려주세요.
            </S.StatusModalText>
          </>
        }
        onCloseModal={onDeleteClubModalClose}
      />
    );
  }
  return null;
};
