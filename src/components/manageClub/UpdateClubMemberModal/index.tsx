import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { useRecoilState } from 'recoil';

import { CommonModal } from '@/components/modal';
import { updateClubMemberModal } from '@/atoms';
import { MANAGE_CLUB } from '@/constant';
import { useGetClubInfo, useUpdateClubMember } from '@/hooks';
import { APIResponse, GetClubMemberResponse } from '@/api';

export interface UpdateClubMemberModalProps {
  memberInfo?: APIResponse<GetClubMemberResponse>;
  cid?: number;
  userId?: string;
  freeze?: number;
  memberName?: string;
}

export const UpdateClubMemberModal: React.FC<UpdateClubMemberModalProps> = ({
  cid,
  userId,
  memberName,
  freeze,
}) => {
  const club = useGetClubInfo(cid);
  const { handleSubmit } = useForm();
  const { mutate } = useUpdateClubMember({
    cid: cid,
    user_id: userId,
    freeze: freeze === 0 ? 10 : 0,
  });
  const onSubmit = () => {
    mutate({});
  };
  const [updateUserModal, setUpdateUserModal] = useRecoilState(updateClubMemberModal);
  const navigate = useNavigate();
  const onClubMemberChangeStatusModalClose = () => {
    if (updateUserModal.isOk === true) {
      club.refetch();
    }
    setUpdateUserModal({ state: false });
    navigate(`${MANAGE_CLUB}`);
  };
  return (
    <>
      {freeze === 0 ? (
        <CommonModal
          leftButtonClick={onClubMemberChangeStatusModalClose}
          modal={updateUserModal}
          title={`대여 정지`}
          message={
            `정말로 부원 ‘${memberName}’님의 대여 정지를 할까요?\n` +
            `대여 정지된 부원은 자유롭게 동아리의 책을 대여할 수 없어요.`
          }
          successMessage={
            `대여 정지가 완료 되었어요.\n` +
            `부원 '${memberName}'은 앞으로 자유롭게 동아리 도서를 대여할 수 없어요.\n` +
            `동아리 관리에서 상태를 확인해보세요.`
          }
          failMessage={
            `부원 '${memberName}'님의 상태 변경에 실패 했어요.\n` +
            `${updateUserModal.data}\n` +
            `위의 나타난 문제로 인해 대여 정지에 실패하였어요.`
          }
          isDanger={true}
          handleSubmit={handleSubmit}
          onValid={onSubmit}
        />
      ) : (
        <CommonModal
          leftButtonClick={onClubMemberChangeStatusModalClose}
          modal={updateUserModal}
          title={`대여 정지 해제`}
          message={
            `정말로 부원 ‘${memberName}’님의 대여 정지 해제를 할까요?\n` +
            `대여 정지 해제된 부원은 자유롭게 동아리의 책을 대여할 수 있어요.`
          }
          successMessage={
            `대여 정지 해제가 완료 되었어요.\n` +
            `부원 '${memberName}'은 앞으로 자유롭게 동아리 도서를 대여할 수 있어요.\n` +
            `동아리 관리에서 상태를 확인해보세요.`
          }
          failMessage={
            `부원 '${memberName}'님의 상태 변경에 실패 했어요.\n` +
            `${updateUserModal.data}\n` +
            `위의 문제로 인해 대여 정지 해제에 실패하였어요.`
          }
          handleSubmit={handleSubmit}
          onValid={onSubmit}
        />
      )}
    </>
  );
};
