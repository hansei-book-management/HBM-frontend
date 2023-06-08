import React from 'react';
import Lottie from 'react-lottie';

import { clubModalProps } from '@/pages';
import { Modal, StatusModal } from '@/components';
import { MANAGE_CLUB, loadingLottieOptions } from '@/constant';

import * as S from './styled';

export interface clubMemberChangeStatusModalProps {
  onClubMemberChangeStatusModalClose: () => void;
  onClubMemberChangeStatusModalNextPage: (userId: string) => void;
  clubMemberChangeStatusModal: clubModalProps;
}

export const ClubMemberChangeStatusModal: React.FC<clubMemberChangeStatusModalProps> = ({
  onClubMemberChangeStatusModalClose,
  onClubMemberChangeStatusModalNextPage,
  clubMemberChangeStatusModal,
}) => {
  if (clubMemberChangeStatusModal.state && clubMemberChangeStatusModal.isOk === null) {
    return (
      <Modal.OverLay>
        <Modal
          textProps={
            <S.ModalContainer>
              <S.ModalTitle>대여 정지 해제 진행</S.ModalTitle>
              <S.ModalDescription>
                정말로 부원 ‘최근원’님의 대여 정지 해제를 할까요?
                <br />
                대여 정지 해제가 완료된 부원은 자유롭게 동아리의 책을 대여할 수 있어요.
              </S.ModalDescription>
            </S.ModalContainer>
          }
          modalSize="large"
          leftButtonText="아니요"
          statusDisable={clubMemberChangeStatusModal.isLoading}
          rightButtonText={
            clubMemberChangeStatusModal.isLoading ? (
              <Lottie options={loadingLottieOptions} height={'1.2rem'} width={'2.6rem'} />
            ) : (
              '네!'
            )
          }
          {...(!clubMemberChangeStatusModal.isLoading && {
            leftButtonClick: () => onClubMemberChangeStatusModalClose(),
            rightButtonClick: () => onClubMemberChangeStatusModalNextPage('asdf'),
          })}
        />
      </Modal.OverLay>
    );
  }
  if (clubMemberChangeStatusModal.state && clubMemberChangeStatusModal.isOk === true) {
    return (
      <StatusModal
        url={`${MANAGE_CLUB}`}
        title={'대여 정지 해제 완료'}
        isOk={true}
        message={
          <>
            <S.StatusModalText>
              대여 정지 해제가 완료 되었어요.
              <br />
              부원 '최근원'은 앞으로 자유롭게 동아리 도서를 대여할 수 있어요.
              <br />
              동아리 관리에서 상태를 확인해보세요.
            </S.StatusModalText>
          </>
        }
        onCloseModal={onClubMemberChangeStatusModalClose}
      />
    );
  }
  if (clubMemberChangeStatusModal.state && clubMemberChangeStatusModal.isOk === false) {
    return (
      <StatusModal
        url={`${MANAGE_CLUB}`}
        title={'대여 정지 해제 실패'}
        isOk={false}
        message={
          <>
            <S.StatusModalText>
              부원 '최근원'님의 대여 실패 했어요.
              <br />
              시스템 상의 문제로 대여 정지 해제에 실패하였어요.
              <br />
              빠른 시일내에 복구될 예정이니 잠시만 기다려주세요.
            </S.StatusModalText>
          </>
        }
        onCloseModal={onClubMemberChangeStatusModalClose}
      />
    );
  }
  return null;
};
