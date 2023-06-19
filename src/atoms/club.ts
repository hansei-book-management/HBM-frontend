import { atom } from 'recoil';

import { ModalStateProps } from '@/components';

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
  },
});

export const deleteClubModal = atom<ModalStateProps>({
  key: 'deleteClubModal',
  default: {
    state: false,
    isOk: null,
    isLoading: null,
  },
});
