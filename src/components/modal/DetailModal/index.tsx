import React from 'react';
import { useParams } from 'react-router-dom';

import { useSetRecoilState } from 'recoil';

import { useGetWindowSize } from '@/hooks';
import { BookListProps } from '@/api';
import { RentMessage } from '@/components/common';
import { bookName } from '@/atoms';

import { Modal } from '../Modal';

import * as S from './styled';

export interface DetailModalProps {
  data?: [BookListProps] | BookListProps[];
  isRed?: boolean;
  leftButtonText: string;
  rightButtonText?: React.ReactNode;
  rightButtonClick?: () => void;
  leftButtonClick?: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  data,
  isRed = false,
  leftButtonText,
  rightButtonText,
  rightButtonClick,
  leftButtonClick,
}) => {
  const { bookId } = useParams<{ bookId: string }>();
  const bookIdNum = Number(bookId);
  const { getWidth } = useGetWindowSize();
  const setBookName = useSetRecoilState(bookName);
  const canRent = data?.filter(({ bid }) => bid === bookIdNum)?.map(({ end }) => end === 0)[0];

  return (
    <Modal.OverLay>
      <Modal
        textProps={
          <>
            {bookId &&
              data
                ?.filter(({ bid }) => bid === bookIdNum)
                .map(({ data }) => {
                  const bookInfo = data.items[0];
                  setBookName(bookInfo.title);
                  return (
                    <>
                      <S.DetailModalContainer>
                        {getWidth <= 580 && (
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifySelf: 'center',
                              alignSelf: 'center',
                            }}
                          >
                            <RentMessage canRent={canRent} />
                            <S.DetailModalMobileTitle>{bookInfo.title}</S.DetailModalMobileTitle>
                            <S.DetailModalImage src={bookInfo.image} />
                          </div>
                        )}
                        {getWidth > 580 && <S.DetailModalImage src={bookInfo.image} />}
                        <S.DetailModalInfoContainer>
                          {getWidth > 580 && (
                            <>
                              <RentMessage canRent={canRent} />
                            </>
                          )}
                          <S.DetailModalTitle>{bookInfo.title}</S.DetailModalTitle>
                          <S.DetailModalInfoText>
                            저자: {bookInfo.author.split('^')[0]}
                            <br />
                            출판사: {bookInfo.publisher}
                          </S.DetailModalInfoText>
                          <S.DetailModalSubTitle>
                            {bookInfo.description.split('\n')[0]}
                            <br />
                            {bookInfo.description.split('\n')[1]}
                          </S.DetailModalSubTitle>
                        </S.DetailModalInfoContainer>
                      </S.DetailModalContainer>
                      <S.DetailModalSummaryTitle>책 소개</S.DetailModalSummaryTitle>
                      <S.DetailModalSummary>
                        {bookInfo.description
                          .split('\n')
                          .slice(2)
                          .map((line) => {
                            return (
                              <>
                                {line}
                                <br />
                              </>
                            );
                          })}
                      </S.DetailModalSummary>
                    </>
                  );
                })}
          </>
        }
        leftButtonText={leftButtonText}
        rightButtonText={rightButtonText}
        rightButtonClick={rightButtonClick}
        {...(leftButtonClick && {
          leftButtonClick: () => leftButtonClick(),
        })}
        isRed={isRed}
        modalSize="large"
      />
    </Modal.OverLay>
  );
};
