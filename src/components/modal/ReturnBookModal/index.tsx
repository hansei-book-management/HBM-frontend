import React, { useState } from 'react';
import { MdLocationOff, MdNotListedLocation, MdCameraAlt } from 'react-icons/md';

import { Modal } from '../CommonModal';

import * as S from './styled';

export interface ReturnBookModalProps {
  modalActive: boolean;
  returnBookModalActive: {
    state: boolean;
    isOk: boolean;
  };
  allowLocation: {
    state: boolean;
    loading: boolean;
  };
  doneButtonClick: () => void;
  nextButtonClick: () => void;
  correctLocation: boolean;
}

export const ReturnBookModal: React.FC<ReturnBookModalProps> = ({
  modalActive,
  returnBookModalActive: { state: returnBookModalState, isOk: returnBookModalIsOk },
  allowLocation: { state: allowLocationState, loading: allowLocationLoading },
  doneButtonClick,
  nextButtonClick,
  correctLocation,
}) => {
  const [selectedImage, setSelectedImage] = useState<string>();

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const image = event.target.files[0];
      console.log(image);
      setSelectedImage(URL.createObjectURL(image));
    }
  };

  if (modalActive && returnBookModalState && !allowLocationState && !allowLocationLoading) {
    return (
      <Modal.OverLay>
        <Modal
          textProps={
            <S.ModalContainer>
              <S.ModalTitle>도서 반납하기</S.ModalTitle>
              <S.ReturnBookModalContainer>
                <MdLocationOff size={'8rem'} color={'#828282'} />
                <S.ReturnBookModalTitle>위치를 식별할 수 없음</S.ReturnBookModalTitle>
                <S.ReturnBookModalMessage>
                  안전하게 반납하기 위해서 위치 권한이 필요해요. <br />
                  브라우저의 설정을 확인해 주세요.
                </S.ReturnBookModalMessage>
              </S.ReturnBookModalContainer>
            </S.ModalContainer>
          }
          leftButtonText="닫기"
          rightButtonText="반납하기"
          modalSize="medium"
          doneButtonClick={doneButtonClick}
          returnBookDisable={true}
        />
      </Modal.OverLay>
    );
  }
  if (
    modalActive &&
    returnBookModalState &&
    allowLocationState &&
    !allowLocationLoading &&
    !correctLocation
  ) {
    return (
      <Modal.OverLay>
        <Modal
          textProps={
            <S.ModalContainer>
              <S.ModalTitle>도서 반납하기</S.ModalTitle>
              <S.ReturnBookModalContainer>
                <MdNotListedLocation size={'8rem'} color={'#828282'} />
                <S.ReturnBookModalTitle>알 수 없는 위치</S.ReturnBookModalTitle>
                <S.ReturnBookModalMessage>
                  학교가 아닌 장소에서는 반납처리를 할 수 없어요.
                  <br />
                  학교에서 반납을 해주세요.
                </S.ReturnBookModalMessage>
              </S.ReturnBookModalContainer>
            </S.ModalContainer>
          }
          leftButtonText="닫기"
          rightButtonText="반납하기"
          modalSize="medium"
          doneButtonClick={doneButtonClick}
          returnBookDisable={true}
        />
      </Modal.OverLay>
    );
  }
  if (
    modalActive &&
    returnBookModalState &&
    allowLocationState &&
    !allowLocationLoading &&
    correctLocation
  ) {
    return (
      <Modal.OverLay>
        <Modal
          textProps={
            <S.ModalContainer>
              <S.ModalTitle>도서 반납하기</S.ModalTitle>
              <S.ReturnBookModalContainer>
                <div>
                  <S.ReturnModalIconContainer imageUrl={selectedImage} for="input-file">
                    {!selectedImage && (
                      <>
                        <MdCameraAlt size={'6rem'} color={'#828282'} />
                        <S.ReturnModalIconTitle>클릭하여 사진 촬영</S.ReturnModalIconTitle>
                      </>
                    )}
                  </S.ReturnModalIconContainer>
                  <S.ReturnBookModalPhotoInput
                    type="file"
                    accept="image/*"
                    title="&nbsp;"
                    value=""
                    onChange={onImageChange}
                    id="input-file"
                  />
                </div>
                <S.ReturnBookModalTitleBlack>반납 사진 제출하기</S.ReturnBookModalTitleBlack>
                <S.ReturnBookModalMessageBlack>
                  반납 사진을 제출하면 반납이 완료돼요.
                  <br />
                  반납 사진은 반납 위치와 책이 잘 나오도록 촬영해 주세요.
                  <br />
                  허위로 제출할 경우 추후 서비스 이용이 어려울 수 있어요.
                </S.ReturnBookModalMessageBlack>
              </S.ReturnBookModalContainer>
            </S.ModalContainer>
          }
          leftButtonText="닫기"
          rightButtonText="반납하기"
          modalSize="medium"
          doneButtonClick={doneButtonClick}
          returnBookDisable={true}
        />
      </Modal.OverLay>
    );
  }
  return null;
};
