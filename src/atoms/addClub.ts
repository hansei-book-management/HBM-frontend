import { atom } from 'recoil';

export const AddClubState = atom({
  key: 'AddClubState',
  default: {
    state: false,
    isOk: false,
  },
});
