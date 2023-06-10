import React from 'react';

import { ClubModalProps } from '@/pages';
import { CommonModal, Modal } from '@/components';
import { CLUB_MEMBER_LIST } from '@/constant';

import * as S from './styled';

export interface ClubChangeDirectorModalProps {
  onClubChangeDirectorModalClose: () => void;
  onClubChangeDirectorQuestionModalOpen: () => void;
  onClubChangeDirectorStatusModalOpen: () => void;
  clubChangeDirectorModal: ClubModalProps;
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
      QuestionModalDescriptionFirst={`정말로 보안관제 부장 변경을 진행 할까요?`}
      QuestionModalDescriptionSecond={`부장이 변경되면 앞으로 보안관제 동아리에 대한 권한을 가질 수 없어요.`}
      StatusModalDescriptionIsOkFirst={`보안관제 부장 변경에 완료 했어요.`}
      StatusModalDescriptionIsOkSecond={`앞으로 보안관제는 '최근원'님만 관리 할 수 있어요.`}
      StatusModalDescriptionIsOkThird={`자유롭게 한북을 이용해 보세요.`}
      StatusModalDescriptionIsNotOkFirst={`보안관제 부장 변경에 실패 하였어요.`}
      StatusModalDescriptionIsNotOkSecond={`시스템 상의 문제로 보안관제 부장 변경에 실패하였어요.`}
      rightButtonText={`변경할게요`}
      isRed={true}
    />
  );
};
