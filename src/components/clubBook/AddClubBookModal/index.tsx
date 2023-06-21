import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import { toast } from 'react-toastify';

import { useRecoilState } from 'recoil';

import { addClubBookModal } from '@/atoms';
import { Modal, StatusModal } from '@/components/modal';
import { AddClubBookValues, BookResponse, SearchBookValue } from '@/api';
import { useGetBooks, useSearchBook } from '@/hooks';
import { MANAGE_CLUB_BOOK } from '@/constant';

import * as S from './styled';

export const AddClubBookModal: React.FC = () => {
  const [addBookModal, setAddBookModal] = useRecoilState(addClubBookModal);

  const { register, handleSubmit } = useForm<SearchBookValue | AddClubBookValues>();

  const onValid = ({ bookName }: SearchBookValue | AddClubBookValues) => {
    bookName ? mutate({ bookName }) : mutate({ bookName: '프로그래밍' });
    setBookList(data.map(({ isbn }) => isbn));
  };

  const { data: books } = useGetBooks();
  const booksData = books?.result.items;

  const { data: searchBook, mutate } = useSearchBook();
  const searchBookData = searchBook?.result.items;

  let data: BookResponse[] = [];
  if (searchBookData) {
    data = searchBookData;
  } else {
    data = booksData || [];
  }

  const [bookList, setBookList] = useState(data.map(({ isbn }) => isbn));
  const [selectNumber, setSelectNumber] = useState(0);

  const toggleBookSelect = (isbn: string) => {
    if (bookList?.includes(isbn)) {
      if (data) {
        setBookList(bookList.filter((bookIsbn) => bookIsbn !== isbn));
        setSelectNumber(data.length - bookList.length + 1);
      }
    } else {
      if (data) {
        setBookList([...bookList, isbn]);
        setSelectNumber(data.length - bookList?.length - 1);
      }
    }
  };

  const onAddBookModalClose = () => {
    setAddBookModal({ state: false });
    setBookList(data.map(({ isbn }) => isbn));
    setSelectNumber(0);
  };

  const onAddBookStateModal = (isOk: boolean) => {
    if (isOk) {
      setAddBookModal({ state: false });
      toast.success('도서가 추가되었습니다.', { position: toast.POSITION.BOTTOM_RIGHT });
    } else {
      setAddBookModal({ state: true, isOk: false });
    }
  };

  if (addBookModal.state === true) {
    return (
      <Modal.OverLay>
        <Modal
          textProps={
            <S.AddBookModalContainer onSubmit={handleSubmit(onValid)}>
              <S.AddBookModalTitle>도서 추가하기</S.AddBookModalTitle>
              <S.AddBookModalInputContainer>
                <S.AddBookModalInput
                  {...register('bookName')}
                  placeholder="검색어를 입력해주세요..."
                />
              </S.AddBookModalInputContainer>
              <span>{searchBook ? searchBook.result.display : books?.result.display}권</span>
              <S.AddBookModalBookList>
                {data.map(({ title, author, isbn, image, description }) => (
                  <S.AddBookModalBookContainer
                    select={bookList.includes(isbn)}
                    key={isbn}
                    onClick={() => toggleBookSelect(isbn)}
                  >
                    <div style={{ height: '100% ', display: 'flex', columnGap: ' 1.6rem' }}>
                      <S.AddBookModalBookItem src={image} />
                      <S.AddBookModalBookInfoContainer>
                        <S.AddBookModalTitleSection>
                          <S.AddBookModalBookTitle>{title}</S.AddBookModalBookTitle>
                          <S.AddBookModalBookAuthor>
                            {author.split('^')[0]} 저자
                          </S.AddBookModalBookAuthor>
                        </S.AddBookModalTitleSection>
                        <S.AddBookModalBookContent>
                          {description.split('\n').map((line) => {
                            return (
                              <>
                                {line}
                                <br />
                              </>
                            );
                          })}
                        </S.AddBookModalBookContent>
                      </S.AddBookModalBookInfoContainer>
                    </div>
                    {bookList.includes(isbn) ? (
                      <div>
                        <MdCheckBoxOutlineBlank
                          size={'1.4rem'}
                          style={{ alignSelf: 'center' }}
                          color="#727272"
                        />
                      </div>
                    ) : (
                      <div>
                        <MdCheckBox
                          size={'1.4rem'}
                          style={{ alignSelf: 'center' }}
                          color="#00A3FF"
                        />
                      </div>
                    )}
                  </S.AddBookModalBookContainer>
                ))}
              </S.AddBookModalBookList>
            </S.AddBookModalContainer>
          }
          modalSize="large"
          leftButtonClick={onAddBookModalClose}
          rightButtonClick={() => onAddBookStateModal(true)}
          {...(selectNumber !== 0
            ? {
                leftButtonText: '닫기',
                rightButtonText: `${selectNumber}권 추가하기`,
              }
            : {
                leftButtonText: `닫기`,
              })}
        />
      </Modal.OverLay>
    );
  }
  if (addBookModal.state && addBookModal.isOk === false) {
    return (
      <StatusModal
        url={`${MANAGE_CLUB_BOOK}`}
        isOk={false}
        title="책 추가 실패"
        message={
          <>
            <S.StatusModalText>
              알 수 없는 오류로 인해 책 추가가 실패했어요.
              <br />
              잠시 후에 다시 시도해주세요.
            </S.StatusModalText>
          </>
        }
        onCloseModal={onAddBookModalClose}
      />
    );
  }
  return null;
};
