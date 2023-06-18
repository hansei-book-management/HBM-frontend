import { atom } from 'recoil';

import { ModalStateProps } from '@/components';

export const generateClubCodeModal = atom<ModalStateProps>({
  key: 'generateClubCode',
  default: {
    state: false,
    isOk: null,
    isLoading: null,
    data: null,
  },
});
