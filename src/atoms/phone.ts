import { atom } from 'recoil';

export const PhoneToken = atom({
  key: 'PhoneToken',
  default: {
    token: '',
    state: false,
  },
});
