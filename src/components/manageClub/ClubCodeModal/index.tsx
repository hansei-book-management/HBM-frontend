import React, { useState } from 'react';
import Lottie from 'react-lottie';
import { Link } from 'react-router-dom';
import { FaRegCopy } from 'react-icons/fa';

import { Modal, ModalStateProps, StatusModal } from '@/components';
import {
  MANAGE_CLUB,
  loadingLottieOptions,
  GENERATE_CODE_DAY_OPTION_LIST,
  GENERATE_CODE_USE_COUNT_OPTION_LIST,
} from '@/constant';

import * as S from './styled';

export interface ClubCodeModalProps {
  onClubCodeModalNextPage: () => void;
  onClubCodeModalClose: () => void;
  onClubCodeModalPrevPage: () => void;
  onClubCodeCopyText: () => void;
  clubCodeModal: ModalStateProps;
}

export interface SelectValueProps {
  dayValue: null | number;
  useCountValue: null | number;
}

export const ClubCodeModal: React.FC<ClubCodeModalProps> = ({
  onClubCodeModalNextPage,
  onClubCodeModalClose,
  onClubCodeModalPrevPage,
  onClubCodeCopyText,
  clubCodeModal,
}) => {
  const [select, setSelected] = useState<SelectValueProps>({
    dayValue: null,
    useCountValue: null,
  });

  const onDayValueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected({ dayValue: parseInt(e.target.value), useCountValue: select.useCountValue });
  };

  const onUseCountValueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected({ dayValue: select.dayValue, useCountValue: parseInt(e.target.value) });
  };

  // const onSubmit = ({}) => {};

  if (clubCodeModal.state && clubCodeModal.isOk === null) {
    return (
      <Modal.OverLay>
        <Modal
          textProps={
            <S.GenerateCodeContainer>
              <S.ModalTitle>코드 생성하기</S.ModalTitle>
              <S.GenerateCodeSelectContainer>
                <S.GenerateCodeTitle>유효기간</S.GenerateCodeTitle>
                <S.GenerateCodeSelect onChange={onDayValueChange}>
                  {GENERATE_CODE_DAY_OPTION_LIST.map(({ value }) => (
                    <option key={value}>{value}</option>
                  ))}
                </S.GenerateCodeSelect>
              </S.GenerateCodeSelectContainer>
              <S.GenerateCodeSelectContainer>
                <S.GenerateCodeTitle>사용횟수</S.GenerateCodeTitle>
                <S.GenerateCodeSelect onChange={onUseCountValueChange}>
                  {GENERATE_CODE_USE_COUNT_OPTION_LIST.map(({ value }) => (
                    <option key={value}>{value}</option>
                  ))}
                </S.GenerateCodeSelect>
              </S.GenerateCodeSelectContainer>
              <S.ModalTitle>유효기간: {select.dayValue}</S.ModalTitle>
              <S.ModalTitle>사용횟수: {select.useCountValue}</S.ModalTitle>
            </S.GenerateCodeContainer>
          }
          leftButtonText="닫기"
          rightButtonText={
            clubCodeModal.isLoading ? (
              <Lottie options={loadingLottieOptions} height={'1.2rem'} width={'2.6rem'} />
            ) : (
              '생성하기'
            )
          }
          statusDisable={clubCodeModal.isLoading}
          modalSize="medium"
          {...(!clubCodeModal.isLoading && {
            rightButtonClick: () => onClubCodeModalNextPage(),
            leftButtonClick: () => onClubCodeModalClose(),
          })}
        />
      </Modal.OverLay>
    );
  }
  if (clubCodeModal.state === true && clubCodeModal.isOk === true) {
    return (
      <Modal.OverLay>
        <Modal
          textProps={
            <S.ClubCodeContainer>
              <div>
                <S.ModalTitle>초대 코드 발급</S.ModalTitle>
                <S.ClubCodeSubTitleContainer>
                  최대 사용 횟수는 7회이고, 30일 동안 유효해요.
                  <Link to="?generate-code-step=1" onClick={onClubCodeModalPrevPage}>
                    수정하기
                  </Link>
                </S.ClubCodeSubTitleContainer>
              </div>
              <S.ClubCodeValueContainer>
                <S.ClubCodeText>앙기모링</S.ClubCodeText>
                <S.ClubCodeCopyButtonWrapper onClick={onClubCodeCopyText}>
                  <FaRegCopy size={'0.9rem'} />
                </S.ClubCodeCopyButtonWrapper>
              </S.ClubCodeValueContainer>
            </S.ClubCodeContainer>
          }
          onlyRightButton={true}
          isOk={true}
          rightButtonText="확인했어요"
          modalSize="small"
          leftButtonClick={onClubCodeModalClose}
        />
      </Modal.OverLay>
    );
  }
  if (clubCodeModal.state === true && clubCodeModal.isOk === false) {
    return (
      <StatusModal
        url={`${MANAGE_CLUB}`}
        title={'동아리 코드 생성 실패'}
        isOk={false}
        message={
          <>
            <S.StatusModalText>
              동아리 코드 생성에 실패 했어요.
              <br />
              시스템 상의 문제로 동아리 코드 생성에 실패하여 동아리 생성 할 수 없어요.
              <br />
              빠른 시일내에 복구될 예정이니 잠시만 기다려주세요.
            </S.StatusModalText>
          </>
        }
        onCloseModal={onClubCodeModalClose}
      />
    );
  }
  return null;
};
