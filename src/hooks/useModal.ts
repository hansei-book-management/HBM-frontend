import { useRecoilState } from 'recoil';

import { ModalState } from '@/atoms';

export const useModal = () => {
  const [modalActive, setModalActive] = useRecoilState(ModalState);

  const close = () => {
    setModalActive(false);
  };

  const open = () => {
    setModalActive(true);
  };

  return { modalActive, close, open };
};
