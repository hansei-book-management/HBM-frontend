import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md';
import { toast } from 'react-toastify';

import { MANAGE_CLUB_BOOK, MANAGE_CLUB_BOOK_OPTIONS } from '@/constant';
import { RentMessage, Section, DetailModal, HeaderSection, Modal, StatusModal } from '@/components';
import { useGetBooks, useModal } from '@/hooks';

import * as S from './styled';

export interface SearchFormValues {
  searchName: string;
}

export interface AddBookModalStateProps {
  status: boolean;
  isOk?: boolean | null;
}

export const ManageClubBookPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormValues>();

  const { data: books } = useGetBooks();
  const booksData = books?.result.items;

  const [addBookModalActive, setAddBookModalActive] = useState<AddBookModalStateProps>({
    status: false,
    isOk: null,
  });

  const [bookList, setBookList] = useState(booksData && booksData.map(({ isbn }) => isbn));
  const [selectNumber, setSelectNumber] = useState(0);

  const { option } = useParams<{ option: string }>();
  const activeOption = MANAGE_CLUB_BOOK_OPTIONS.find(({ id }) => id === option);

  const { modalActive } = useModal();

  const onAddBookModalOpen = () => {
    setAddBookModalActive({ status: true });
  };

  const onAddBookModalClose = () => {
    setAddBookModalActive({ status: false });
  };

  const onAddBookStateModal = (isOk: boolean) => {
    if (isOk) {
      setAddBookModalActive({ status: false });
      toast.success('도서가 추가되었습니다.', { position: toast.POSITION.BOTTOM_RIGHT });
    } else {
      setAddBookModalActive({ status: true, isOk: false });
    }
  };

  const toggleBookSelect = (isbn: string) => {
    console.log(bookList, 'book list');
    console.log(
      booksData?.map(({ isbn }) => isbn),
      'book data map',
    ); //(10) [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    if (bookList?.includes(isbn)) {
      console.log(booksData);
      if (booksData) {
        setBookList(bookList.filter((bookIsbn) => bookIsbn !== isbn));
        setSelectNumber(booksData.length - bookList.length + 1);
      }
    } else {
      if (booksData && bookList) {
        setBookList([...bookList, isbn]);
        setSelectNumber(booksData.length - bookList?.length - 1);
      }
    }
  };

  const onValid = ({ searchName }: SearchFormValues) => {
    console.log(searchName, '앙기모링');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!activeOption) {
      navigate(`${MANAGE_CLUB_BOOK}/${MANAGE_CLUB_BOOK_OPTIONS[0].id}`);
    }
  }, [activeOption]);

  return (
    <S.ManageClubBookContainer>
      {activeOption && (
        <HeaderSection
          name={activeOption.text}
          activeId={option}
          href={`${MANAGE_CLUB_BOOK}`}
          list={MANAGE_CLUB_BOOK_OPTIONS}
          onClick={onAddBookModalOpen}
        />
      )}
      <Section mangeClubName="hsoc" />
      {modalActive && !addBookModalActive.status && (
        <DetailModal message={<RentMessage canRent={true} />} leftButtonText="닫기" />
      )}
      {addBookModalActive.status && (
        <Modal.OverLay>
          <Modal
            textProps={
              <S.AddBookModalContainer onSubmit={handleSubmit(onValid)}>
                <S.AddBookModalTitle>도서 추가하기</S.AddBookModalTitle>
                <S.AddBookModalInputContainer>
                  <S.AddBookModalInput
                    {...register('searchName', {
                      required: '최소 2글자 이상 입력하셔야합니다.',
                      minLength: { value: 2, message: '최소 2글자 이상 입력하셔야합니다.' },
                    })}
                    placeholder="검색어를 입력해주세요..."
                  />
                  {errors.searchName?.message && (
                    <S.AddBookModalFormErrorMessage>
                      {errors.searchName.message}
                    </S.AddBookModalFormErrorMessage>
                  )}
                </S.AddBookModalInputContainer>
                <span>{books?.result.display}권</span>
                <S.AddBookModalBookList>
                  {booksData?.map(({ title, author, isbn, image, description }) => (
                    <S.AddBookModalBookContainer
                      select={bookList?.includes(isbn)} // 해석하면
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
                      {bookList?.includes(isbn) ? (
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
      )}
      {addBookModalActive.status && addBookModalActive.isOk === false && (
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
      )}
    </S.ManageClubBookContainer>
  );
};
