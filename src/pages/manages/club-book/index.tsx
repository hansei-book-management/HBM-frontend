import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { MANAGE_CLUB_BOOK_OPTIONS } from '@/constant';
import { RentMessage, Section, DetailModal, HeaderSection, Modal } from '@/components';
import { useModal } from '@/hooks';

import * as S from './styled';

export interface SearchFormProps {
  searchName: string;
}

export interface AddBookModalStateProps {
  status: boolean;
  isOk: null | boolean;
}

const BASE_URL = '/manage/club-book';

export const ManageClubBookPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormProps>();

  const { modalActive, open, close } = useModal();
  const [addBookModalActive, setAddBookModalActive] = useState<AddBookModalStateProps>({
    status: false,
    isOk: null || false,
  });

  const { option } = useParams<{ option: string }>();
  const activeOption = MANAGE_CLUB_BOOK_OPTIONS.find(({ id }) => id === option);
  const onAddBookModalOpen = () => {
    setAddBookModalActive({ status: true, isOk: null });
    open();
  };

  const onAddBookModalClose = () => {
    setAddBookModalActive({ status: false, isOk: null });
    close();
  };

  const onValid = ({ searchName }: SearchFormProps) => {
    console.log(searchName, '앙기모링');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!activeOption) {
      navigate(`${BASE_URL}/${MANAGE_CLUB_BOOK_OPTIONS[0].id}`);
    }
  }, [activeOption]);

  return (
    <S.ManageClubBookContainer>
      {activeOption && (
        <HeaderSection
          name={activeOption.text}
          activeId={option}
          href={`${BASE_URL}`}
          list={MANAGE_CLUB_BOOK_OPTIONS}
          onClick={onAddBookModalOpen}
        />
      )}
      <Section mangeClubName="hsoc" />
      {modalActive && !addBookModalActive.status && (
        <DetailModal
          message={<RentMessage canRent={true} />}
          rightButtonText="닫기"
          nextButtonClick={close}
        />
      )}
      {modalActive && addBookModalActive.status && (
        <Modal.OverLay>
          <Modal
            textProps={
              <S.AddBookModalContainer onSubmit={handleSubmit(onValid)}>
                <S.AddBookModalTitle>도서 반납하기</S.AddBookModalTitle>
                <S.AddBookModalInputForm>
                  <S.AddBookModalInput
                    {...register('searchName', {
                      minLength: { value: 2, message: '최소 2글자 이상 입력하셔야합니다.' },
                    })}
                    placeholder="검색어를 입력해주세요..."
                  />
                  {errors.searchName?.message && (
                    <S.AddBookModalFormErrorMessage>
                      {errors.searchName.message}
                    </S.AddBookModalFormErrorMessage>
                  )}
                </S.AddBookModalInputForm>
              </S.AddBookModalContainer>
            }
            rightButtonText="닫기"
            modalSize="large"
            nextButtonClick={onAddBookModalClose}
          />
        </Modal.OverLay>
      )}
    </S.ManageClubBookContainer>
  );
};
