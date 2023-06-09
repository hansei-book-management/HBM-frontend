import React from 'react';
import Lottie from 'react-lottie';

import { ClubModalProps } from '@/pages';
import { CommonModal, Modal, StatusModal } from '@/components';
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
  return (
    <CommonModal
      leftButtonClick={onDeleteClubModalClose}
      rightButtonClick={onDeleteClubStatusModalOpen}
      modal={deleteClubModal}
      title={'삭제'}
      isRed={true}
      QuestionModalDescriptionFirst={"정말로 '보안관제' 동아리를 삭제할까요?"}
      QuestionModalDescriptionSecond={'삭제된 동아리의 도서는 더 이상 대여할 수 없어요.'}
      StatusModalDescriptionIsOkFirst={"'보안관제' 동아리가 삭제 되었어요."}
      StatusModalDescriptionIsOkSecond={"앞으로 '보안관제' 동아리의 도서를 대여할 수 없어요."}
      StatusModalDescriptionIsOkThird={"그리고 부장이었던 '최근원'님은 이제 일반 회원이 되었어요."}
      StatusModalDescriptionIsNotOkFirst={"'보안관제' 동아리가 삭제에 실패했어요."}
      StatusModalDescriptionIsNotOkSecond={'시스템 상의 문제로 동아리 삭제에 실패하였어요.'}
      rightButtonText={'삭제할게요'}
    />
  );
};
