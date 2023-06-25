import React from 'react';

import { Modal } from '@/components';
import { APIResponse, GetClubMemberResponse } from '@/api';

import * as S from './styled';

export interface ClubMemberInfoModalProps {
  memberInfo?: APIResponse<GetClubMemberResponse>;
  borrowBooks?: number;
  leftButtonClick: () => void;
}

export const ClubMemberInfoModal: React.FC<ClubMemberInfoModalProps> = ({
  memberInfo,
  leftButtonClick,
  borrowBooks,
}) => {
  const member = memberInfo?.result;
  const memberBorrowBooks = member?.books.book;
  return (
    <Modal.OverLay>
      <Modal
        textProps={
          <S.ModalUserContainer>
            <S.ModalTitle>부원 {member?.name}</S.ModalTitle>
            <S.ModalUserBookInfoText>현재 대출중인 책: {borrowBooks}권</S.ModalUserBookInfoText>
            {memberBorrowBooks
              ? memberBorrowBooks
                  .filter(({ end }) => end !== 0)
                  .map(({ data }, i) => (
                    <S.ModalUserBookInfo key={i}>
                      <S.ModalUserBookInfoTitle>{data?.items[0].title}:</S.ModalUserBookInfoTitle>
                      <S.ModalUserBookInfoStatus isOk={member.freeze === 0}>
                        대여 중
                      </S.ModalUserBookInfoStatus>
                    </S.ModalUserBookInfo>
                  ))
              : null}
          </S.ModalUserContainer>
        }
        leftButtonText="확인"
        modalSize="large"
        leftButtonClick={leftButtonClick}
      />
    </Modal.OverLay>
  );
};
