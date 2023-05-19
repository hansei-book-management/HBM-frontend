import React from 'react';
import Lottie from 'react-lottie';
import { useNavigate } from 'react-router-dom';

import { useSetRecoilState } from 'recoil';

import { checkLottieOptions, failLottieOptions } from '@/constant';
import { useGetLocation } from '@/hooks';
import { AddClubState } from '@/atoms';

import { Modal } from '../CommonModal';

import * as S from './styled';

export interface StatusModalProps {
  url: string;
}

export const StatusModal: React.FC<StatusModalProps> = ({ url }) => {
  const setAddClubClick = useSetRecoilState(AddClubState);

  const { manageUserBookPage } = useGetLocation({});
  const navigate = useNavigate();

  const onCloseNavigate = () => {
    navigate(`${url}`);
    setAddClubClick(false);
  };

  const isOk = false;

  return (
    <Modal.OverLay>
      <Modal
        textProps={
          <S.StatusModalContainer>
            <Lottie
              options={isOk ? checkLottieOptions : failLottieOptions}
              height={'8rem'}
              width={'8rem'}
            />
            <S.StatusModalTitle>
              {manageUserBookPage ? '추가 성공' : '대여 성공'}
            </S.StatusModalTitle>
            <S.StatusModalTextContainer>
              {manageUserBookPage ? (
                <>
                  <S.StatusModalText>
                    보안관제 동아리 도서가 추가되었어요.
                    <br />
                    앞으로 보안관제 동아리 도서를 대여할 수 있어요.
                    <br />내 도서에서 확인해보세요.
                  </S.StatusModalText>
                </>
              ) : (
                <>
                  <S.StatusModalText>
                    ‘당신이 모르는 민주주의’ 책을 대여했어요.
                    <br />
                    대출 기한은 10일이며, 연장 신청을 할 수 있어요.
                    <br />
                    1차 반납 기간은 2023년 X월 X일까지에요.
                  </S.StatusModalText>
                </>
              )}
            </S.StatusModalTextContainer>
          </S.StatusModalContainer>
        }
        rightButtonText="확인했어요"
        doneButtonClick={() => onCloseNavigate()}
        modalSize="medium"
        statusModal={true}
        isOk={isOk}
      />
    </Modal.OverLay>
  );
};
