import { SetterOrUpdater, useRecoilState } from 'recoil';

import { ModalState } from '@/atoms';

export const useModal = () => {
  const [modalActive, setModalActive] = useRecoilState(ModalState);

  const closeModal = (setModalActive: SetterOrUpdater<boolean>) => () => {
    setModalActive(false);
  };

  const openModal = (setModalActive: SetterOrUpdater<boolean>) => () => {
    setModalActive(true);
  };

  return {
    modalActive,
    close: closeModal(setModalActive),
    open: openModal(setModalActive),
  };
};
