import React from 'react';
import Lottie from 'react-lottie';

import { ClubModalProps } from '@/pages';
import { Modal, StatusModal } from '@/components';
import { CLUB_MEMBER_LIST, MANAGE_CLUB, loadingLottieOptions } from '@/constant';

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
                <S.GenerateCodeSelectContainer key={i}>
                  <S.GenerateCodeTitle>{title}</S.GenerateCodeTitle>
                  <S.GenerateCodeSelect>
                    {memberList.map(({ member }) => (
                      <option key={member}>{member}</option>
                    ))}
                  </S.GenerateCodeSelect>
                </S.GenerateCodeSelectContainer>
              ))}
            </S.ModalContainer>
          }
          modalSize="medium"
          leftButtonText="아니요"
          statusDisable={clubChangeDirectorModal.isLoading}
          rightButtonText={
            clubChangeDirectorModal.isLoading ? (
              <Lottie options={loadingLottieOptions} height={'1.2rem'} width={'2.6rem'} />
            ) : (
              '네!'
            )
          }
          leftButtonClick={onClubChangeDirectorModalClose}
          rightButtonClick={onClubChangeDirectorQuestionModalOpen}
        />
      </Modal.OverLay>
    );
  }
  if (clubChangeDirectorModal.state && clubChangeDirectorModal.page === 2) {
    return (
      <Modal.OverLay>
        <Modal
          textProps={
            <S.ModalContainer>
              <S.ModalTitle>부장 변경 진행</S.ModalTitle>
              <S.ModalDescription>
                정말로 보안관제 부장 변경을 진행 할까요?
                <br />
                부장이 변경되면 앞으로 보안관제 동아리에 대한 권한을 가질 수 없어요.
              </S.ModalDescription>
            </S.ModalContainer>
          }
          modalSize="medium"
          leftButtonText="아니요"
          statusDisable={clubChangeDirectorModal.isLoading}
          rightButtonText={
            clubChangeDirectorModal.isLoading ? (
              <Lottie options={loadingLottieOptions} height={'1.2rem'} width={'2.6rem'} />
            ) : (
              '변경할게요'
            )
          }
          isRed={true}
          {...(!clubChangeDirectorModal.isLoading && {
            leftButtonClick: () => onClubChangeDirectorModalClose(),
            rightButtonClick: () => onClubChangeDirectorStatusModalOpen(),
          })}
        />
      </Modal.OverLay>
    );
  }
  if (
    clubChangeDirectorModal.state &&
    clubChangeDirectorModal.page === 3 &&
    clubChangeDirectorModal.isOk === true
  ) {
    return (
      <StatusModal
        url={`${MANAGE_CLUB}`}
        title={'부장 변경 완료'}
        isOk={true}
        message={
          <>
            <S.StatusModalText>
              보안관제 부장 변경에 완료 했어요.
              <br />
              앞으로 보안관제는 '최근원'님만 관리 할 수 있어요.
              <br />
              자유롭게 한북을 이용해 보세요.
            </S.StatusModalText>
          </>
        }
        onCloseModal={onClubChangeDirectorModalClose}
      />
    );
  }
  if (
    clubChangeDirectorModal.state &&
    clubChangeDirectorModal.page === 3 &&
    clubChangeDirectorModal.isOk === false
  ) {
    return (
      <StatusModal
        url={`${MANAGE_CLUB}`}
        title={'부장 변경 실패'}
        isOk={false}
        message={
          <>
            <S.StatusModalText>
              보안관제 부장 변경에 실패 하였어요.
              <br />
              시스템 상의 문제로 보안관제 부장 변경에 실패하였어요.
              <br />
              빠른 시일내에 복구될 예정이니 잠시만 기다려주세요.
            </S.StatusModalText>
          </>
        }
        onCloseModal={onClubChangeDirectorModalClose}
      />
    );
  }
  return null;
};
