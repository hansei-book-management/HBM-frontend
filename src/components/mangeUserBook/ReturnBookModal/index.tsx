import React, { useState } from 'react';
import { MdLocationOff, MdNotListedLocation, MdCameraAlt } from 'react-icons/md';
import Lottie from 'react-lottie';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { useRecoilState, useRecoilValue } from 'recoil';
import imageCompression from 'browser-image-compression';

import { loadingLottieOptions } from '@/constant';
import { useGetUserBooks, useReturnBook } from '@/hooks';
import { bookName, returnClubBookModal } from '@/atoms';

import { Modal } from '../../modal';
import { StatusModal } from '../../modal/StatusModal';

import * as S from './styled';

export interface ReturnBookModalProps {
  cid?: number;
  url: string;
  clubName?: string;
  uid?: string;
}

export const ReturnBookModal: React.FC<ReturnBookModalProps> = ({ url, cid, clubName, uid }) => {
  const { bookId } = useParams<{ bookId: string }>();
  const [returnBookModal, setReturnBookModal] = useRecoilState(returnClubBookModal);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const returnBookName = useRecoilValue(bookName);
  const userBooks = useGetUserBooks(uid);

  const navigate = useNavigate();

  const { mutate } = useReturnBook({
    cid,
    bid: Number(bookId),
    image: returnBookModal.image || undefined,
    uid: uid,
  });

  const { handleSubmit } = useForm();

  const onSubmit = () => {
    mutate({});
  };

  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const compressOptions = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    if (event.target.files && event.target.files[0]) {
      const imageUrl = event.target.files[0];
      const compressedFile = await imageCompression(imageUrl, compressOptions);
      reader.readAsDataURL(compressedFile);
      reader.onloadend = () => {
        const base64data = reader.result?.toString().split(',')[1];
        setReturnBookModal((prev) => ({ ...prev, image: base64data }));
      };
      setSelectedImage(URL.createObjectURL(imageUrl));
    }
  };

  const onReturnBookModalClose = () => {
    setSelectedImage(null);
    setReturnBookModal({ state: false, image: null });
    userBooks.refetch();
    navigate(`/user-book`);
  };

  if (returnBookModal.state && returnBookModal.allowLocation === false) {
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
          leftButtonClick={onReturnBookModalClose}
          returnBookDisable={true}
        />
      </Modal.OverLay>
    );
  }
  if (returnBookModal.state && returnBookModal.correctLocation === false) {
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
          leftButtonClick={onReturnBookModalClose}
          returnBookDisable={true}
        />
      </Modal.OverLay>
    );
  }
  if (returnBookModal.state && returnBookModal.correctLocation === true) {
    return (
      <Modal.OverLay>
        <Modal
          textProps={
            <S.ModalContainer>
              <S.ModalTitle>도서 반납하기</S.ModalTitle>
              <S.ReturnBookModalContainer>
                <div>
                  <S.ReturnModalIconContainer imageUrl={selectedImage} htmlFor="input-file">
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
                    id="input-file"
                    onChange={onImageChange}
                  />
                </div>
                <S.ReturnBookModalTitleBlack>
                  {selectedImage ? '반납 사진 제출하기' : '반납 완료하기'}
                </S.ReturnBookModalTitleBlack>
                <S.ReturnBookModalMessageBlack>
                  {selectedImage ? (
                    <>
                      반납 사진을 확인했어요! :)
                      <br />
                      반납을 계속하려면 아래 “반납하기” 버튼을 눌러 주세요.
                    </>
                  ) : (
                    <>
                      반납 사진을 제출하면 반납이 완료돼요.
                      <br />
                      반납 사진은 반납 위치와 책이 잘 나오도록 촬영해 주세요.
                      <br />
                      허위로 제출할 경우 추후 서비스 이용이 어려울 수 있어요.
                    </>
                  )}
                </S.ReturnBookModalMessageBlack>
              </S.ReturnBookModalContainer>
            </S.ModalContainer>
          }
          leftButtonText="닫기"
          statusDisable={returnBookModal.isLoading === true}
          rightButtonText={
            returnBookModal.isLoading === true ? (
              <Lottie options={loadingLottieOptions} height={'1.2rem'} width={'2.6rem'} />
            ) : (
              '반납하기'
            )
          }
          modalSize="medium"
          {...(!returnBookModal.isLoading && {
            leftButtonClick: () => onReturnBookModalClose(),
          })}
          handleSubmit={handleSubmit}
          onValid={onSubmit}
          {...(!selectedImage && { returnBookDisable: true })}
        />
      </Modal.OverLay>
    );
  }
  if (returnBookModal.state && returnBookModal.isOk === false) {
    return (
      <StatusModal
        url={url}
        title="반납 실패"
        isOk={false}
        message={
          <>
            <S.StatusModalText>
              반납 사진이 잘못되었어요 아래 사항을 확인해주세요.
              <br />
              {returnBookModal.data}
              <br />
              새로 촬영해주세요. 기본 카메라 앱으로 촬영해주세요.
              <br />
              문제가 지속되면 부장에게 연락해 주세요.
            </S.StatusModalText>
          </>
        }
        onCloseModal={onReturnBookModalClose}
      />
    );
  }
  if (returnBookModal.state && returnBookModal.isOk === true) {
    return (
      <StatusModal
        url={url}
        title="반납 성공"
        isOk={true}
        message={
          <>
            <S.StatusModalText>
              '{returnBookName}' 도서가 반납되었어요.
              <br />
              반납 알람은 {clubName} 동아리 부장에게 전해졌어요.
              <br />
              자유롭게 HANBOOK을 이용해 보세요.
            </S.StatusModalText>
          </>
        }
        onCloseModal={onReturnBookModalClose}
      />
    );
  }
  return null;
};
