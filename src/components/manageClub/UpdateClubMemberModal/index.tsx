import { useNavigate } from 'react-router-dom';

import { useRecoilState } from 'recoil';

import { CommonModal } from '@/components/modal';
import { updateClubMemberModal } from '@/atoms';
import { MANAGE_CLUB } from '@/constant';

export const UpdateClubMemberModal: React.FC = () => {
  const [updateUserModal, setUpdateUserModal] = useRecoilState(updateClubMemberModal);
  const navigate = useNavigate();
  const onClubMemberChangeStatusModalClose = () => {
    setUpdateUserModal({ state: false });
    navigate(`${MANAGE_CLUB}`);
  };
  return (
    <>
      <CommonModal
        leftButtonClick={onClubMemberChangeStatusModalClose}
        modal={updateUserModal}
        title={`대여 정지 해제`}
        message={
          `정말로 부원 ‘최근원’님의 대여 정지 해제를 할까요?\n` +
          `대여 정지 해제된 부원은 자유롭게 동아리의 책을 대여할 수 있어요.`
        }
        successMessage={
          `대여 정지 해제가 완료 되었어요.\n` +
          `부원 '최근원'은 앞으로 자유롭게 동아리 도서를 대여할 수 있어요.\n` +
          `동아리 관리에서 상태를 확인해보세요.`
        }
        failMessage={
          `부원 '최근원'님의 상태 변경에 실패 했어요.\n` +
          `시스템 상의 문제로 대여 정지 해제에 실패하였어요.\n` +
          `빠른 시일내에 복구될 예정이니 잠시만 기다려주세요.`
        }
      />
    </>
  );
};
