import { atom } from 'recoil';

export const VerificationCode = atom({
  key: 'VerificationCode',
  default: {
    message: '',
  },
});
