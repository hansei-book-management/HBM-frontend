import React from 'react';
import Lottie from 'react-lottie';
import { Link } from 'react-router-dom';
import { FaRegCopy } from 'react-icons/fa';

import { Modal, StatusModal } from '@/components';
import { MANAGE_CLUB, GENERATE_CODE_OPTION_LIST, loadingLottieOptions } from '@/constant';
import { ClubModalProps } from '@/pages';

import * as S from './styled';

export interface clubCodeModalProps {
  onClubCodeModalNextPage: () => void;
  onClubCodeModalClose: () => void;
  onClubCodeModalPrevPage: () => void;
  onClubCodeCopyText: () => void;
  clubCodeModal: ClubModalProps;
}

export const ClubCodeModal: React.FC<clubCodeModalProps> = ({
  onClubCodeModalNextPage,
  onClubCodeModalClose,
  onClubCodeModalPrevPage,
  onClubCodeCopyText,
  clubCodeModal,
}) => {
  if (clubCodeModal.state && clubCodeModal.isOk === null) {
    return (
      <Modal.OverLay>
        <Modal
          textProps={
            <S.GenerateCodeContainer>
              <S.ModalTitle>코드 생성하기</S.ModalTitle>
              {GENERATE_CODE_OPTION_LIST.map(({ title, optionList }, i) => (
                <S.GenerateCodeSelectContainer key={i}>
                  <S.GenerateCodeTitle>{title}</S.GenerateCodeTitle>
                  <S.GenerateCodeSelect>
                    {optionList.map(({ value }) => (
                      <option key={value}>{value}</option>
                    ))}
                  </S.GenerateCodeSelect>
                </S.GenerateCodeSelectContainer>
              ))}
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
