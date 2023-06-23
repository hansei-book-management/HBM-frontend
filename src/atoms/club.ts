import { atom } from 'recoil';

import { ModalStateProps } from '@/components';
import { ReturnBookModalStateProps } from '@/pages';

export const generateClubCodeModal = atom<ModalStateProps>({
  key: 'generateClubCode',
  default: {
    state: false,
    isOk: null,
    isLoading: null,
    data: null,
    page: null,
  },
});

export const addUserClubModal = atom<ModalStateProps>({
  key: 'addUserClubModal',
  default: {
    state: false,
    isOk: null,
    isLoading: null,
    data: null,
  },
});

export const updateClubMemberModal = atom<ModalStateProps>({
  key: 'updateUserModal',
  default: {
    state: false,
    isOk: null,
    isLoading: null,
    data: null,
  },
});

export const expelClubMemberModal = atom<ModalStateProps>({
  key: 'expelClubMemberModal',
  default: {
    state: false,
    isOk: null,
    isLoading: null,
    data: null,
  },
});

export const deleteClubModal = atom<ModalStateProps>({
  key: 'deleteClubModal',
  default: {
    state: false,
    isOk: null,
    isLoading: null,
    data: null,
  },
});

export const changeClubDirectorModal = atom<ModalStateProps>({
  key: 'changeClubDirectorModal',
  default: {
    state: false,
    isOk: null,
    isLoading: null,
    page: null,
    data: null,
  },
});

export const addClubBookModal = atom<ModalStateProps>({
  key: 'addClubBookModal',
  default: {
    state: false,
    isOk: null,
    isLoading: null,
    data: null,
  },
});

export const rentClubBookModal = atom<ModalStateProps>({
  key: 'rentClubBookModal',
  default: {
    state: false,
    isOk: null,
    isLoading: null,
    data: null,
  },
});

export const returnClubBookModal = atom<ReturnBookModalStateProps>({
  key: 'returnClubBookModal',
  default: {
    state: false,
    isOk: null,
    isLoading: null,
    data: null,
    allowLocation: null,
    correctLocation: null,
    image: null,
  },
});

export const deleteClubBookModal = atom<ModalStateProps>({
  key: 'deleteClubBookModal',
  default: {
    state: false,
    isOk: null,
    isLoading: null,
    data: null,
  },
});
