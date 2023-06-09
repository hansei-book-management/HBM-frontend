import React from 'react';
import Lottie from 'react-lottie';

import { ClubModalProps } from '@/pages';
import { Modal, StatusModal } from '@/components/modal';
import { MANAGE_CLUB, loadingLottieOptions } from '@/constant';

import * as S from './styled';

export interface ClubMemberExpelModalProps {
  onClubMemberExpelModalClose: () => void;
  onClubMemberExpelModalNextPage: (userId: string) => void;
  clubMemberExpelModal: ClubModalProps;
}

export const ClubMemberExpelModal: React.FC<ClubMemberExpelModalProps> = ({
  onClubMemberExpelModalClose,
  onClubMemberExpelModalNextPage,
  clubMemberExpelModal,
}) => {
  if (clubMemberExpelModal.state && clubMemberExpelModal.isOk === null) {
    return (
      <Modal.OverLay>
        <Modal
          textProps={
            <S.ModalContainer>
              <S.ModalTitle>추방 진행</S.ModalTitle>
              <S.ModalDescription>
                정말로 부원 ‘박찬영'님을 추방할까요?
                <br />
                추방된 부원은 보안관제 동아리의 책을 대여할 수 없어요.
              </S.ModalDescription>
            </S.ModalContainer>
          }
          modalSize="large"
          leftButtonText="아니요"
          statusDisable={clubMemberExpelModal.isLoading}
          rightButtonText={
            clubMemberExpelModal.isLoading ? (
              <Lottie options={loadingLottieOptions} height={'1.2rem'} width={'2.6rem'} />
            ) : (
              '네!'
            )
          }
          {...(!clubMemberExpelModal.isLoading && {
            leftButtonClick: () => onClubMemberExpelModalClose(),
            rightButtonClick: () => onClubMemberExpelModalNextPage('asdf'),
          })}
        />
      </Modal.OverLay>
    );
  }
  if (clubMemberExpelModal.state && clubMemberExpelModal.isOk === true) {
    return (
      <StatusModal
        url={`${MANAGE_CLUB}`}
        title={'추방 완료'}
        isOk={true}
        message={
          <>
            <S.StatusModalText>
              부원 ‘박찬영'님이 추방 되었어요.
              <br />
              부원 ‘박찬영'님은 앞으로 이 동아리 도서를 대여할 수 없어요.
              <br />
              동아리 관리에서 이 부원의 상태를 확인할 수 없어요.
            </S.StatusModalText>
          </>
        }
        onCloseModal={onClubMemberExpelModalClose}
      />
    );
  }
  if (clubMemberExpelModal.state && clubMemberExpelModal.isOk === false) {
    return (
      <StatusModal
        url={`${MANAGE_CLUB}`}
        title={'추방 실패'}
        isOk={false}
        message={
          <>
            <S.StatusModalText>
              부원 ‘박찬영'님 추방에 실패하였어요.
              <br />
              시스템 상의 문제로 부원 추방에 실패하였어요.
              <br />
              빠른 시일내에 복구될 예정이니 잠시만 기다려주세요.
            </S.StatusModalText>
          </>
        }
        onCloseModal={onClubMemberExpelModalClose}
      />
    );
  }
  return null;
};
