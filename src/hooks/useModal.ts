import { SetterOrUpdater, useRecoilState } from 'recoil';

import {
  AddBookModalState,
  BookModalState,
  CreateInviteCodeModalState,
  JoinClubModalState,
  ModalState,
  StatusModalState,
  UserModalState,
} from '@/atoms';

export const useModal = () => {
  const [modalActive, setModalActive] = useRecoilState(ModalState);
  const [addBookModalActive, setAddBookModalActive] = useRecoilState(AddBookModalState);
  const [bookModalActive, setBookModalActive] = useRecoilState(BookModalState);
  const [inviteCodeModalActive, setInviteCodeModalActive] = useRecoilState(
    CreateInviteCodeModalState,
  );
  const [joinClubModalActive, setJoinClubModalActive] = useRecoilState(JoinClubModalState);
  const [statusModalActive, setStatusModalActive] = useRecoilState(StatusModalState);
  const [userModalActive, setUserModalActive] = useRecoilState(UserModalState);

  const closeModal = (setState: SetterOrUpdater<boolean>) => () => setState(false);
  const openModal = (setState: SetterOrUpdater<boolean>) => () => setState(true);

  return {
    modalActive,
    close: closeModal(setModalActive),
    open: openModal(setModalActive),
    addBookModalActive,
    closeAddBookModal: closeModal(setAddBookModalActive),
    openAddBookModal: openModal(setAddBookModalActive),
    bookModalActive,
    closeBookModal: closeModal(setBookModalActive),
    openBookModal: openModal(setBookModalActive),
    inviteCodeModalActive,
    closeInviteCodeModal: closeModal(setInviteCodeModalActive),
    openInviteCodeModal: openModal(setInviteCodeModalActive),
    joinClubModalActive,
    closeJoinClubModal: closeModal(setJoinClubModalActive),
    openJoinClubModal: openModal(setJoinClubModalActive),
    statusModalActive,
    closeStatusModal: closeModal(setStatusModalActive),
    openStatusModal: openModal(setStatusModalActive),
    userModalActive,
    closeUserModal: closeModal(setUserModalActive),
    openUserModal: openModal(setUserModalActive),
  };
};
