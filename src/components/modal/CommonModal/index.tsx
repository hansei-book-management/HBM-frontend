import React from 'react';
import Lottie from 'react-lottie';

import { Modal, ModalStateProps, StatusModal } from '@/components';
import { MANAGE_CLUB, loadingLottieOptions } from '@/constant';

import * as S from './styled';

export interface CommonModalProps {
  leftButtonClick: () => void;
  rightButtonClick: (userId?: string, bookId?: number) => void;
  modal: ModalStateProps;
  title: string;
  QuestionModalDescriptionFirst: string;
  QuestionModalDescriptionSecond: string;
  StatusModalDescriptionIsOkFirst: string;
  StatusModalDescriptionIsOkSecond: string;
  StatusModalDescriptionIsOkThird: string;
  StatusModalDescriptionIsNotOkFirst: string;
  StatusModalDescriptionIsNotOkSecond: string;
  StatusModalDescriptionIsNotOkThird?: string;
  rightButtonText?: string;
  isRed?: boolean;
}

export const CommonModal: React.FC<CommonModalProps> = ({
  leftButtonClick,
  rightButtonClick,
  modal,
  title,
  QuestionModalDescriptionFirst,
  QuestionModalDescriptionSecond,
  StatusModalDescriptionIsOkFirst,
  StatusModalDescriptionIsOkSecond,
  StatusModalDescriptionIsOkThird,
  StatusModalDescriptionIsNotOkFirst,
  StatusModalDescriptionIsNotOkSecond,
  StatusModalDescriptionIsNotOkThird = '빠른 시일내에 복구될 예정이니 잠시만 기다려주세요.',
  rightButtonText = '네!',
  isRed,
}) => {
  if (
    (modal.state && modal.isOk === null) ||
    (modal.state && modal.isOk === null && modal.page === 2)
  ) {
    return (
      <Modal.OverLay>
        <Modal
          textProps={
            <S.ModalContainer>
              <S.ModalTitle>{title} 진행</S.ModalTitle>
              <S.ModalDescription>
                {QuestionModalDescriptionFirst}
                <br />
                {QuestionModalDescriptionSecond}
              </S.ModalDescription>
            </S.ModalContainer>
          }
          modalSize="medium"
          leftButtonText="아니요"
          statusDisable={modal.isLoading}
          isRed={isRed}
          rightButtonText={
            modal.isLoading ? (
              <Lottie options={loadingLottieOptions} height={'1.2rem'} width={'2.6rem'} />
            ) : (
              rightButtonText
            )
          }
          {...(!modal.isLoading && {
            leftButtonClick: () => leftButtonClick(),
            rightButtonClick: () => rightButtonClick(),
          })}
        />
      </Modal.OverLay>
    );
  }
  if (
    (modal.state && modal.isOk === true) ||
    (modal.state && modal.isOk === true && modal.page === 3)
  ) {
    return (
      <StatusModal
        url={`${MANAGE_CLUB}`}
        title={`${title} 완료`}
        isOk={true}
        message={
          <>
            <S.StatusModalText>
              {StatusModalDescriptionIsOkFirst}
              <br />
              {StatusModalDescriptionIsOkSecond}
              <br />
              {StatusModalDescriptionIsOkThird}
            </S.StatusModalText>
          </>
        }
        onCloseModal={leftButtonClick}
      />
    );
  }
  if (
    (modal.state && modal.isOk === false) ||
    (modal.state && modal.isOk === false && modal.page === 3)
  ) {
    return (
      <StatusModal
        url={`${MANAGE_CLUB}`}
        title={`${title} 실패`}
        isOk={false}
        message={
          <>
            <S.StatusModalText>
              {StatusModalDescriptionIsNotOkFirst}
              <br />
              {StatusModalDescriptionIsNotOkSecond}
              <br />
              {StatusModalDescriptionIsNotOkThird}
            </S.StatusModalText>
          </>
        }
        onCloseModal={leftButtonClick}
      />
    );
  }
  return null;
};
