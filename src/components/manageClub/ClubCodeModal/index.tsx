import React, { useState } from 'react';
import Lottie from 'react-lottie';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegCopy } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

import { useRecoilState } from 'recoil';

import { Modal, StatusModal } from '@/components';
import {
  MANAGE_CLUB,
  loadingLottieOptions,
  GENERATE_CODE_DAY_OPTION_LIST,
  GENERATE_CODE_USE_COUNT_OPTION_LIST,
} from '@/constant';
import { useGenerateClubCode } from '@/hooks';
import { GenerateClubCodeValues } from '@/api';
import { generateClubCodeModal } from '@/atoms';

import * as S from './styled';

export interface ClubCodeModalProps {
  clubId: number;
}

export interface SelectValueProps {
  end: null | number;
  use: null | number;
}

export const ClubCodeModal: React.FC<ClubCodeModalProps> = ({ clubId }) => {
  const { handleSubmit, register } = useForm<GenerateClubCodeValues>();
  const [clubCodeModal, setClubCodeModal] = useRecoilState(generateClubCodeModal);

  const { mutate } = useGenerateClubCode();

  const [selectValue, setSelectValue] = useState({
    end: 1,
    use: 1,
  });

  const onSubmit = ({ end, use }: GenerateClubCodeValues) => {
    const parsedEnd = parseInt(end.toString(), 10);
    const parsedUse = parseInt(use.toString(), 10);
    if (end && use) {
      mutate({ end: parsedEnd, use: parsedUse, cid: clubId });
    }
    setSelectValue({ end: end, use: use });
  };

  const navigate = useNavigate();

  const onClubCodeModalClose = () => {
    setClubCodeModal({ state: false });
    navigate(`${MANAGE_CLUB}`);
  };

  const onClubCodeModalPrevPage = () => {
    setClubCodeModal({ state: true, page: 1 });
  };

  const onClubCodeCopyText = () => {
    navigator.clipboard.writeText(clubCodeModal.data || '');
  };

  if (clubCodeModal.state && clubCodeModal.page === 1) {
    return (
      <Modal.OverLay>
        <Modal
          textProps={
            <S.GenerateCodeContainer>
              <S.ModalTitle>코드 생성하기</S.ModalTitle>
              <S.GenerateCodeSelectContainer>
                <S.GenerateCodeTitle>유효기간</S.GenerateCodeTitle>
                <S.GenerateCodeSelect {...register('end')}>
                  {GENERATE_CODE_DAY_OPTION_LIST.map(({ value }) => (
                    <option key={value}>{value}</option>
                  ))}
                </S.GenerateCodeSelect>
              </S.GenerateCodeSelectContainer>
              <S.GenerateCodeSelectContainer>
                <S.GenerateCodeTitle>사용횟수</S.GenerateCodeTitle>
                <S.GenerateCodeSelect {...register('use')}>
                  {GENERATE_CODE_USE_COUNT_OPTION_LIST.map(({ value }) => (
                    <option key={value}>{value}</option>
                  ))}
                </S.GenerateCodeSelect>
              </S.GenerateCodeSelectContainer>
            </S.GenerateCodeContainer>
          }
          leftButtonText="닫기"
          rightButtonText={
            clubCodeModal.isLoading === true ? (
              <Lottie options={loadingLottieOptions} height={'1.2rem'} width={'2.6rem'} />
            ) : (
              '생성하기'
            )
          }
          statusDisable={clubCodeModal.isLoading === true}
          modalSize="medium"
          {...(!clubCodeModal.isLoading && {
            leftButtonClick: () => onClubCodeModalClose(),
          })}
          handleSubmit={handleSubmit}
          onValid={onSubmit}
        />
      </Modal.OverLay>
    );
  }
  if (clubCodeModal.state && clubCodeModal.isOk === true) {
    return (
      <Modal.OverLay>
        <Modal
          textProps={
            <S.ClubCodeContainer>
              <div>
                <S.ModalTitle>초대 코드 발급</S.ModalTitle>
                <S.ClubCodeSubTitleContainer>
                  최대 사용 횟수는 {selectValue.end}이고, {selectValue.use} 동안 유효해요.
                  <Link to="?generate-code-step=1" onClick={onClubCodeModalPrevPage}>
                    수정하기
                  </Link>
                </S.ClubCodeSubTitleContainer>
              </div>
              <S.ClubCodeValueContainer>
                <S.ClubCodeText>{clubCodeModal.data}</S.ClubCodeText>
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
  if (clubCodeModal.state && clubCodeModal.isOk === false) {
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
