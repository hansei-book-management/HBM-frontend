import { atom } from 'recoil';

import { ReturnBookModalStateProps } from '@/pages';
import { ModalStateProps } from '@/components';

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

export const bookName = atom<string>({
  key: 'bookName',
  default: '',
});
