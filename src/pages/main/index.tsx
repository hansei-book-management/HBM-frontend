import React from 'react';

import { useRecoilState } from 'recoil';

import { Main1PNG, Main2PNG, Main3PNG } from '@/assets';
import { FooterSection, MainSection, Modal } from '@/components';
import { useGetWindowSize } from '@/hooks';
import { ModalState } from '@/atoms';

export const MainPage: React.FC = () => {
  const { getWidth } = useGetWindowSize();
  const [modalActive, setModalActive] = useRecoilState(ModalState);

  const openModal = () => {
    setModalActive(true);
  };

  return (
    <>
      <MainSection
        smallText={
          <>
            한세사이버보안고등학교 자율동아리 {''}
            {getWidth <= 630 && <br />}
            도서관리 시스템
          </>
        }
        largeText="HANBOOK"
        imageUrl={Main1PNG}
      />
      <MainSection
        smallText="불편했던 동아리 도서관리, 이제 그만!"
        largeText="쉬운 도서관리 📚"
        isSecondary={true}
        imageUrl={Main2PNG}
      />
      <MainSection
        smallText="한층 더 쉬워진 대출 관리 "
        largeText="한 눈에 보기 👀"
        imageUrl={Main3PNG}
      />
      <FooterSection />
      <button onClick={openModal}>open</button>
      {modalActive && <Modal />}
    </>
  );
};
