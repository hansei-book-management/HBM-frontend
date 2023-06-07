import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md';
import { toast } from 'react-toastify';

import { BOOK_LIST, MANAGE_CLUB_BOOK, MANAGE_CLUB_BOOK_OPTIONS } from '@/constant';
import { RentMessage, Section, DetailModal, HeaderSection, Modal, StatusModal } from '@/components';
import { useModal } from '@/hooks';
import { Book1PNG } from '@/assets';

import * as S from './styled';

export interface SearchFormValues {
  searchName: string;
}

export interface AddBookModalStateProps {
  status: boolean;
  isOk: null | boolean;
}

export const ManageClubBookPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormValues>();

  const [addBookModalActive, setAddBookModalActive] = useState<AddBookModalStateProps>({
    status: false,
    isOk: null || false,
  });

  const [bookList, setBookList] = useState(BOOK_LIST.map(({ id }) => id));
  const [selectNumber, setSelectNumber] = useState(0);

  const { option } = useParams<{ option: string }>();
  const activeOption = MANAGE_CLUB_BOOK_OPTIONS.find(({ id }) => id === option);

  const { modalActive, open, close } = useModal();
  const onAddBookModalOpen = () => {
    setAddBookModalActive({ status: true, isOk: null });
    open();
  };

  const onAddBookModalClose = () => {
    setAddBookModalActive({ status: false, isOk: true });
    close();
    toast.success('도서가 추가되었습니다.', { position: toast.POSITION.BOTTOM_RIGHT });
  };

  const toggleBookSelect = (id: number) => {
    if (bookList.includes(id)) {
      setBookList(bookList.filter((bookId) => bookId !== id));
      setSelectNumber(BOOK_LIST.length - bookList.length + 1);
    } else {
      setBookList([...bookList, id]);
      setSelectNumber(BOOK_LIST.length - bookList.length - 1);
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
      {modalActive && addBookModalActive.status && addBookModalActive.isOk === null && (
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
                <S.AddBookModalBookList>
                  {BOOK_LIST.map(({ id }) => (
                    <S.AddBookModalBookContainer
                      select={bookList.includes(id)}
                      key={id}
                      onClick={() => toggleBookSelect(id)}
                    >
                      <div style={{ height: '100% ', display: 'flex', columnGap: ' 1.6rem' }}>
                        <S.AddBookModalBookItem src={Book1PNG} />
                        <S.AddBookModalBookInfoContainer>
                          <div style={{ display: 'flex' }}>
                            <S.AddBookModalBookTitle>세이노의 가르침</S.AddBookModalBookTitle>
                            <S.AddBookModalBookContent>세이노 저자</S.AddBookModalBookContent>
                          </div>
                          <S.AddBookModalBookContent>
                            재야의 명저 『세이노의 가르침』 2023년판 정식 출간!
                            <br />
                            순자산 천억 원대 자산가, 세이노의 ‘요즘 생각’을 만나다
                          </S.AddBookModalBookContent>
                        </S.AddBookModalBookInfoContainer>
                      </div>
                      {bookList.includes(id) ? (
                        <>
                          <MdCheckBoxOutlineBlank
                            size={'1.4rem'}
                            style={{ alignSelf: 'center' }}
                            color="#727272"
                          />
                        </>
                      ) : (
                        <>
                          <MdCheckBox
                            size={'1.4rem'}
                            style={{ alignSelf: 'center' }}
                            color="#00A3FF"
                          />
                        </>
                      )}
                    </S.AddBookModalBookContainer>
                  ))}
                </S.AddBookModalBookList>
              </S.AddBookModalContainer>
            }
            modalSize="large"
            nextButtonClick={onAddBookModalClose}
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
      {modalActive && addBookModalActive.status && addBookModalActive.isOk === false && (
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
        />
      )}
    </S.ManageClubBookContainer>
  );
};
