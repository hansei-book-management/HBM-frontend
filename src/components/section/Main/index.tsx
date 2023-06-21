import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';

import axios from 'axios';

import { Book1PNG } from '@/assets';
import { noDataLottieOptions, UserClubItem } from '@/constant';
import { useGetLocation, useModal } from '@/hooks';
import { StatusMessage } from '@/components';
import { BookResponse, getAllClubsResponse } from '@/api';

import { Skeleton } from '../../common/Skeleton';

import * as S from './styled';

export interface SectionProps {
  data?: [
    {
      data: {
        items: [BookResponse];
      };
      end: number;
    },
  ];
  mangeClubName?: string;
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

export const Section: React.FC<SectionProps> = ({ data, mangeClubName }) => {
  const [page, setPage] = useState(1);
  const { open } = useModal();

  const navigate = useNavigate();

  const { rentPage } = useGetLocation({});

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

  const openModal = (bookId: number) => {
    open();
    // if (rentPage) {
    //   navigate(`/club/${clubName}/book/${bookId}`);
    // }
  };

  const id = Math.floor(Math.random() * 10) + 1;

  useEffect(() => {
    setPage(1);
    // refetch();
  }, [data]);

  return (
    <>
      <S.SectionContainer>
        {data?.map(({ data }, i) => {
          const bookInfo = data.items[0];
          return (
            <S.SectionImageContainer>
              <S.SectionImage src={bookInfo.image} onClick={() => openModal(1)} />
              <S.SectionImageTitleContainer>
                <S.SectionImageTitle onClick={() => openModal(1)}>
                  {bookInfo.title}
                </S.SectionImageTitle>
                <S.SectionImageSubTitle>
                  {bookInfo.author} · {bookInfo.publisher}
                </S.SectionImageSubTitle>
                <StatusMessage />
              </S.SectionImageTitleContainer>
              {/* 
          
          const Rent = () => {
              if (rendPage) return <div/
              if (manageClubCanRend) return <div/
          }
          */}
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
