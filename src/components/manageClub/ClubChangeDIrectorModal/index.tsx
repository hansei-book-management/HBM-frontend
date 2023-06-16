import React from 'react';

import { CommonModal, Modal, ModalStateProps } from '@/components';
import { CLUB_MEMBER_LIST } from '@/constant';

import * as S from './styled';

export interface ClubChangeDirectorModalProps {
  onClubChangeDirectorModalClose: () => void;
  onClubChangeDirectorQuestionModalOpen: () => void;
  onClubChangeDirectorStatusModalOpen: () => void;
  clubChangeDirectorModal: ModalStateProps;
}

export const ClubChangeDirectorModal: React.FC<ClubChangeDirectorModalProps> = ({
  onClubChangeDirectorModalClose,
  onClubChangeDirectorQuestionModalOpen,
  onClubChangeDirectorStatusModalOpen,
  clubChangeDirectorModal,
}) => {
  if (clubChangeDirectorModal.state && clubChangeDirectorModal.page === 1) {
    return (
      <Modal.OverLay>
        <Modal
          textProps={
            <S.ModalContainer>
              <S.ModalTitle>부장 변경</S.ModalTitle>
              {CLUB_MEMBER_LIST.map(({ title, memberList }, i) => (
                <S.ModalSelectContainer key={i}>
                  <S.ModalSelectTitle>{title}</S.ModalSelectTitle>
                  <S.ModalSelect>
                    {memberList.map(({ member }) => (
                      <option key={member}>{member}</option>
                    ))}
                  </S.ModalSelect>
                </S.ModalSelectContainer>
              ))}
            </S.ModalContainer>
          }
          modalSize="medium"
          leftButtonText="취소"
          rightButtonText={'진행'}
          leftButtonClick={onClubChangeDirectorModalClose}
          rightButtonClick={onClubChangeDirectorQuestionModalOpen}
        />
      </Modal.OverLay>
    );
  }
  return (
    <CommonModal
      leftButtonClick={onClubChangeDirectorModalClose}
      rightButtonClick={onClubChangeDirectorStatusModalOpen}
      modal={clubChangeDirectorModal}
      title={`부장 변경`}
      message={
        `정말로 보안관제 부장 변경을 진행 할까요?\n` +
        `부장이 변경되면 앞으로 보안관제 동아리에 대한 권한을 가질 수 없어요.`
      }
      successMessage={
        `보안관제 부장 변경에 완료 했어요.\n` +
        `앞으로 보안관제는 '최근원'님만 관리 할 수 있어요.\n` +
        `자유롭게 한북을 이용해 보세요.`
      }
      failMessage={
        `보안관제 부장 변경에 실패 하였어요.\n` +
        `시스템 상의 문제로 보안관제 부장 변경에 실패하였어요. \n` +
        `빠른 시일내에 복구될 예정이니 잠시만 기다려주세요.`
      }
      rightButtonText={`변경할게요`}
      isDanger={true}
    />
  );
};
