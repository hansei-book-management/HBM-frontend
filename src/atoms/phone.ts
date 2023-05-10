import { atom } from 'recoil';

export const PhoneTokenState = atom({
  key: 'PhoneToken',
  default: {
    token: '',
    state: false,
  },
});
