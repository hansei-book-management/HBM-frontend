import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { useRecoilState } from 'recoil';

import { CommonModal, Modal } from '@/components';
import { MANAGE_CLUB } from '@/constant';
import { changeClubDirectorModal } from '@/atoms';
import { useChangeClubDirector, useLogout } from '@/hooks';
import { ChangeClubDirectorValues, ClubMemberInfo } from '@/api';

import * as S from './styled';

export interface ClubChangeDirectorModalProps {
  cid?: number;
  clubName: string;
  directorName?: string;
  clubMembers: ClubMemberInfo[];
}

export const ClubChangeDirectorModal: React.FC<ClubChangeDirectorModalProps> = ({
  cid,
  clubName,
  clubMembers,
  directorName,
}) => {
  const { handleSubmit, register } = useForm<ChangeClubDirectorValues>();
  const { mutate, data } = useChangeClubDirector();
  const [newDirector, setNewDirector] = useState<string | null>('');
  const { deleteUserInformation } = useLogout();

  const onSubmit = ({ director }: ChangeClubDirectorValues) => {
    const uid = director.split(' ')[4].split(':')[0];
    mutate({ cid, name: clubName, director: uid });
    const newDirector = director.split(' ')[1].split(':')[0];
    setNewDirector(newDirector);
  };

  const handleLogoutButtonClick = useCallback(() => {
    if (data?.result) {
      deleteUserInformation();
    }
    onClubChangeDirectorModalClose();
  }, [deleteUserInformation]);

  const navigate = useNavigate();

  const [changeDirectorModal, setChangeDirectorModal] = useRecoilState(changeClubDirectorModal);

  const onClubChangeDirectorModalClose = () => {
    setChangeDirectorModal({ state: false });
    navigate(`${MANAGE_CLUB}`);
  };

  const onClubChangeDirectorQuestionModalOpen = () => {
    setChangeDirectorModal({ state: true, isOk: null, page: 2 });
    navigate(`${MANAGE_CLUB}/change-director`);
  };

  if (changeDirectorModal.state && changeDirectorModal.page === 1) {
    return (
      <Modal.OverLay>
        <Modal
          textProps={
            <S.ModalContainer>
              <S.ModalTitle>부장 변경</S.ModalTitle>
              <S.ModalSelectContainer>
                <S.ModalSelectTitle>현재 부장</S.ModalSelectTitle>
                <S.ModalSelect>
                  <option>{directorName}</option>
                </S.ModalSelect>
              </S.ModalSelectContainer>
              <S.ModalSelectContainer>
                <S.ModalSelectTitle>변경할 부장</S.ModalSelectTitle>
                <S.ModalSelect {...register('director')}>
                  {clubMembers.map(({ name, uid }) => (
                    <option key={name}>
                      이름: {name} , 아이디: {uid}
                    </option>
                  ))}
                </S.ModalSelect>
              </S.ModalSelectContainer>
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
      leftButtonClick={handleLogoutButtonClick}
      modal={changeDirectorModal}
      title={`부장 변경`}
      message={
        `정말로 ${clubName} 부장 변경을 진행 할까요?\n` +
        `부장이 변경되면 앞으로 ${clubName} 동아리에 대한 권한을 가질 수 없어요.`
      }
      successMessage={
        `${clubName} 부장 변경에 완료 했어요.\n` +
        `앞으로 ${clubName}는 '${newDirector}'님만 관리 할 수 있어요.\n` +
        `자유롭게 HANBOOK을 이용해 보세요.`
      }
      failMessage={
        `${clubName} 부장 변경에 실패 하였어요.\n` +
        `${changeDirectorModal.data} \n` +
        `위의 문제로 인해 ${clubName} 부장 변경에 실패하였어요.`
      }
      rightButtonText={`변경할게요`}
      isDanger={true}
      handleSubmit={handleSubmit}
      onValid={onSubmit}
    />
  );
};
