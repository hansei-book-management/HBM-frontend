import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';

import { useRecoilState } from 'recoil';

import { addClubBookModal } from '@/atoms';
import { Modal, StatusModal } from '@/components/modal';
import { BookResponse, SearchBookValue } from '@/api';
import { useAddClubBook, useGetBooks, useSearchBook } from '@/hooks';
import { MANAGE_CLUB_BOOK } from '@/constant';

import * as S from './styled';

export interface AddBookModalStateProps {
  cid?: number;
  clubName?: string;
}

export const AddClubBookModal: React.FC<AddBookModalStateProps> = ({ cid, clubName }) => {
  const [addBookModal, setAddBookModal] = useRecoilState(addClubBookModal);

  const { register, handleSubmit } = useForm<SearchBookValue>();

  const { data: books } = useGetBooks();
  const booksData = books?.result.items;

  const { data: searchBook, mutate: searchBookMutate } = useSearchBook();
  const searchBookData = searchBook?.result.items;

  const { mutate: addBookMutate } = useAddClubBook();

  const onSearchBookSubmit = ({ bookName }: SearchBookValue) => {
    bookName ? searchBookMutate({ bookName }) : searchBookMutate({ bookName: '프로그래밍' });
    setBookList(data.map(({ isbn }) => isbn));
  };

  const onAddBokSubmit = () => {
    setAddBook('');
    addBookMutate({ cid, isbn: addBook });
  };

  let data: BookResponse[] = [];
  if (searchBookData) {
    data = searchBookData;
  } else {
    data = booksData || [];
  }

  const [bookList, setBookList] = useState(data.map(({ isbn }) => isbn));
  const [selectNumber, setSelectNumber] = useState(0);
  const [addBook, setAddBook] = useState('');

  const toggleBookSelect = (isbn: string) => {
    if (bookList?.includes(isbn)) {
      if (data) {
        const addBookIsbn = bookList.filter((bookIsbn) => bookIsbn === isbn).toString();
        setAddBook((prev) => (prev ? prev + ',' + addBookIsbn : addBookIsbn));
        setBookList(bookList.filter((bookIsbn) => bookIsbn !== isbn));
        setSelectNumber(data.length - bookList.length + 1);
      }
    } else {
      if (data) {
        setAddBook((prev) => prev.replace(isbn, '').replace(',', ''));
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

  useEffect(() => {
    setBookList(data.map(({ isbn }) => isbn));
    if (addBookModal.isOk === false) {
      setAddBook('');
    }
  }, [addBookModal.state, searchBook]);

  if (addBookModal.state === true && addBookModal.isOk === null) {
    return (
      <Modal.OverLay>
        <Modal
          textProps={
            <S.AddBookModalContainer onSubmit={handleSubmit(onSearchBookSubmit)}>
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
          {...(selectNumber !== 0
            ? {
                leftButtonText: '닫기',
                rightButtonText: `${selectNumber}권 추가하기`,
              }
            : {
                leftButtonText: `닫기`,
              })}
          handleSubmit={handleSubmit}
          onValid={onAddBokSubmit}
        />
      </Modal.OverLay>
    );
  }
  if (addBookModal.state && addBookModal.isOk === true) {
    return (
      <StatusModal
        url={`${MANAGE_CLUB_BOOK}`}
        isOk={true}
        title="책 추가 성공"
        message={
          <>
            <S.StatusModalText>
              {clubName} 동아리의 책 추가에 성공 했어요!
              <br />
              이제 '도서 대여'에서 {clubName} 동아리의 책 확인을 할 수 있어요.
              <br />
              자유롭게 HANBOOK을 이용해 보세요.
            </S.StatusModalText>
          </>
        }
        onCloseModal={onAddBookModalClose}
      />
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
              동아리 책 추가에 실패했어요.
              <br />
              {addBookModal.data}
              <br />
              위의 문제로 인해 동아리 책 추가에 실패하였어요.
            </S.StatusModalText>
          </>
        }
        onCloseModal={onAddBookModalClose}
      />
    );
  }
  return null;
};
