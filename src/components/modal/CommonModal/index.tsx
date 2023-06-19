import React from 'react';
import Lottie from 'react-lottie';

import { Modal, ModalStateProps, StatusModal } from '@/components';
import { MANAGE_CLUB, loadingLottieOptions } from '@/constant';

import * as S from './styled';

export interface CommonModalProps {
  leftButtonClick: () => void;
  rightButtonClick?: (bookId?: number) => void;
  modal: ModalStateProps;
  title: string;
  message: string;
  isDanger?: boolean;
  successMessage: string;
  failMessage: string;
  rightButtonText?: string;
  handleSubmit?: any;
  onValid?: any;
}

export const CommonModal: React.FC<CommonModalProps> = ({
  leftButtonClick,
  modal,
  title,
  isDanger = false,
  message,
  successMessage,
  failMessage,
  rightButtonText = '네!',
  handleSubmit,
  onValid,
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
                {message.split('\n').map((line) => {
                  return (
                    <>
                      {line}
                      <br />
                    </>
                  );
                })}
              </S.ModalDescription>
            </S.ModalContainer>
          }
          modalSize="medium"
          leftButtonText="아니요"
          statusDisable={modal.isLoading === true}
          isRed={isDanger}
          rightButtonText={
            modal.isLoading === true ? (
              <Lottie options={loadingLottieOptions} height={'1.2rem'} width={'2.6rem'} />
            ) : (
              rightButtonText
            )
          }
          {...(modal.isLoading === false && {
            leftButtonClick: leftButtonClick,
          })}
          handleSubmit={handleSubmit}
          onValid={onValid}
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
              {successMessage.split('\n').map((line) => {
                return (
                  <>
                    {line}
                    <br />
                  </>
                );
              })}
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
              {failMessage.split('\n').map((line) => {
                return (
                  <>
                    {line}
                    <br />
                  </>
                );
              })}
            </S.StatusModalText>
          </>
        }
        onCloseModal={leftButtonClick}
      />
    );
  }
  return null;
};
