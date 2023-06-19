import React from 'react';
import { useParams } from 'react-router-dom';

import { Modal } from '@/components';
import { useGetClubMember } from '@/hooks';

import * as S from './styled';

export interface userBookModalProps {
  cid: number;
  leftButtonClick: () => void;
}

export const ClubMemberInfoModal: React.FC<userBookModalProps> = ({ cid, leftButtonClick }) => {
  const { userId } = useParams<{ userId: string }>();
  const { data: getMember } = useGetClubMember({ cid, user_id: userId });
  const member = getMember?.result;
  return (
    <Modal.OverLay>
      <Modal
        textProps={
          <S.ModalUserContainer>
            <S.ModalTitle>부원 {member?.name}</S.ModalTitle>
            <S.ModalUserBookInfoText>
              현재 대출중인 책: {member?.borrowBook}권
            </S.ModalUserBookInfoText>
            {member?.books.map(({ data, title }, i) => (
              <S.ModalUserBookInfo key={i}>
                <S.ModalUserBookInfoTitle>{title}:</S.ModalUserBookInfoTitle>
                <S.ModalUserBookInfoStatus isOk={member.freeze === 1}>
                  {data}
                </S.ModalUserBookInfoStatus>
              </S.ModalUserBookInfo>
            ))}
          </S.ModalUserContainer>
        }
        leftButtonText="확인"
        modalSize="medium"
        leftButtonClick={leftButtonClick}
      />
    </Modal.OverLay>
  );
};
