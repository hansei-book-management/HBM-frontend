import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { useRecoilState } from 'recoil';

import { CommonModal } from '@/components/modal';
import { useExpelClubMember, useGetClubMember, useGetClubInfo } from '@/hooks';
import { expelClubMemberModal } from '@/atoms';
import { MANAGE_CLUB } from '@/constant';

export interface ExpelClubMemberModalProps {
  cid?: number;
}

export const ExpelClubMemberModal: React.FC<ExpelClubMemberModalProps> = ({ cid }) => {
  const { userId } = useParams<{ userId: string }>();
  const { data } = useGetClubMember({ cid, user_id: userId });
  const memberName = data?.result.name;
  const [expelMemberModal, setExpelMemberModal] = useRecoilState(expelClubMemberModal);
  const navigate = useNavigate();

  const { handleSubmit } = useForm();
  const { mutate } = useExpelClubMember({ cid, user_id: userId });
  const onSubmit = () => {
    mutate({});
  };
  const club = useGetClubInfo(cid);

  const onClubMemberExpelModalClose = () => {
    setExpelMemberModal({ state: false, isOk: null });
    navigate(`${MANAGE_CLUB}`);
    club.refetch();
  };
  return (
    <CommonModal
      leftButtonClick={onClubMemberExpelModalClose}
      modal={expelMemberModal}
      title={`추방`}
      message={
        `정말로 부원 ‘${memberName}’님을 추방할까요?\n` +
        `추방된 부원은 앞으로 현재 동아리의 책을 대여할 수 없어요.`
      }
      successMessage={
        `부원 ‘${memberName}’님이 추방 되었어요.\n` +
        `부원 ‘${memberName}’님은 앞으로 이 동아리 도서를 대여할 수 없어요.\n` +
        `동아리 관리에서 이 부원의 상태를 확인할 수 없어요.`
      }
      failMessage={
        `부원 ‘${memberName}’님 추방에 실패하였어요.\n` +
        `${expelMemberModal.data}\n` +
        `위의 문제로 인해 부원 추방에 실패하였어요.`
      }
      rightButtonText={'추방'}
      isDanger={true}
      handleSubmit={handleSubmit}
      onValid={onSubmit}
    />
  );
};
