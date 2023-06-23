import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';

import axios from 'axios';

import { noDataLottieOptions } from '@/constant';
import { useModal } from '@/hooks';
import { StatusMessage } from '@/components';
import { BookListProps, BookResponse, GetAllBooksResponse, GetUserBooksResponse } from '@/api';

import { Skeleton } from '../../common/Skeleton';

import * as S from './styled';

export interface SectionProps {
  data?: [BookListProps] | BookListProps[];
  navigateUrl?: string;
}

export interface Book {
  id: number;
  title: string;
  canRent: boolean;
  club: string;
}

export interface BookItem {
  books: Book[];
  totalPages: number;
  totalResults: number;
}

export const Section: React.FC<SectionProps> = ({ data, navigateUrl }) => {
  const [page, setPage] = useState(1);
  const { open } = useModal();

  const navigate = useNavigate();

  // const getRentApi = async (clubName: string, page: number) => {
  //   const res = await axios.get(`http://localhost:3000/rent/${clubName}?page=${page}`);
  //   return res.data;
  // };

  // const getManageApi = async (clubName: string, page: number) => {
  //   const res = await axios.get(`http://localhost:3000/rent/${clubName}?page=${page}`);
  //   return res.data;
  // };

  // const { data, isLoading, refetch } = useQuery<BookItem>(['bookList', clubName, page], () => {
  //   if (rentPage) {
  //     return getRentApi(clubName || '', page);
  //   } else {
  //     return getManageApi(clubName || mangeClubName || '', page);
  //   }
  // });

  // const onNextPageClick = () => {
  //   setPage((prev) => prev + 1);
  //   if (rentPage) {
  //     navigate(`/rent/${clubName}?page=${page + 1}`);
  //   } else {
  //     navigate(`/manage?page=${page + 1}`);
  //   }
  //   window.scrollTo(0, 0);
  // };

  // const onPrevPageClick = () => {
  //   setPage((prev) => prev - 1);
  //   if (rentPage) {
  //     navigate(`/rent/${clubName}?page=${page - 1}`);
  //   } else {
  //     navigate(`/manage?page=${page - 1}`);
  //   }
  //   window.scrollTo(0, 0);
  // };

  const openModal = (bookId?: number) => {
    open();
    navigate(`${navigateUrl}/${bookId}`);
  };

  useEffect(() => {
    setPage(1);
    // refetch();
  }, [data]);

  return (
    <>
      <S.SectionContainer>
        {data?.map(({ data, bid, end }, i) => {
          const bookInfo = data.items[0];
          return (
            <S.SectionImageContainer key={i}>
              <S.SectionImage src={bookInfo.image} onClick={() => openModal(bid)} />
              <S.SectionImageTitleContainer>
                <S.SectionImageTitle onClick={() => openModal(bid)}>
                  {bookInfo.title}
                </S.SectionImageTitle>
                <S.SectionImageSubTitle>
                  {bookInfo.author.split('^')[0]} · {bookInfo.publisher}
                </S.SectionImageSubTitle>
                <StatusMessage canRent={end === 0} />
              </S.SectionImageTitleContainer>
            </S.SectionImageContainer>
          );
        })}
      </S.SectionContainer>
      {/* {!isLoading && data?.totalPages !== 0 && data?.books.length !== 0 && (
        <S.SectionPaginationContainer>
          {page > 1 && (
            <S.SectionPaginationButton onClick={onPrevPageClick}>&larr;</S.SectionPaginationButton>
          )}
          <S.SectionPaginationText>
            {page} / {data?.totalPages}
          </S.SectionPaginationText>
          {page !== data?.totalPages && (
            <S.SectionPaginationButton onClick={onNextPageClick}>&rarr;</S.SectionPaginationButton>
          )}
        </S.SectionPaginationContainer>
      )} */}
      {/* {isLoading ? <Skeleton isRentPage={rentPage || false} /> : <></>} */}
    </>
  );
};
