import React from 'react';

import * as S from './styled';

export const Modal: React.FC = () => {
  return (
    <S.ModalOverlay>
      <S.ModalContainer>
        <S.ModalContentContainer>
          <S.ModalTitle>대여 진행</S.ModalTitle>
          <S.ModalDescription>
            정말로 ‘당신이 모르는 민주주의’ 책을 대출할까요? 대출이 완료된 책은 동아리 부장의 확인을
            받아야 반납처리할 수 있어요.
          </S.ModalDescription>
        </S.ModalContentContainer>
        <S.ModalButtonContainer>
          <S.ModalButton left={true}>아니요</S.ModalButton>
          <S.ModalButton left={false}>네!</S.ModalButton>
        </S.ModalButtonContainer>
      </S.ModalContainer>
    </S.ModalOverlay>
  );
};
