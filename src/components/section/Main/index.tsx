import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';

import axios from 'axios';

import { Book1PNG } from '@/assets';
import { RentClubItem, noDataLottieOptions, UserClubItem } from '@/constant';
import { useGetLocation, useModal } from '@/hooks';
import { StatusMessage } from '@/components';

import { Skeleton } from '../../common/Skeleton';

import * as S from './styled';

export interface SectionProps {
  activeClub?: RentClubItem | UserClubItem;
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

export const Section: React.FC<SectionProps> = ({ activeClub, mangeClubName }) => {
  const [page, setPage] = useState(1);
  const { open } = useModal();

  const navigate = useNavigate();

  const { rentPage } = useGetLocation({});

  const clubName = activeClub?.id;

  const getRentApi = async (clubName: string, page: number) => {
    const res = await axios.get(`http://localhost:3000/rent/${clubName}?page=${page}`);
    return res.data;
  };

  const getManageApi = async (clubName: string, page: number) => {
    const res = await axios.get(`http://localhost:3000/rent/${clubName}?page=${page}`);
    return res.data;
  };

  const { data, isLoading, refetch } = useQuery<BookItem>(['bookList', clubName, page], () => {
    if (rentPage) {
      return getRentApi(clubName || '', page);
    } else {
      return getManageApi(clubName || mangeClubName || '', page);
    }
  });

  const onNextPageClick = () => {
    setPage((prev) => prev + 1);
    if (rentPage) {
      navigate(`/rent/${clubName}?page=${page + 1}`);
    } else {
      navigate(`/manage?page=${page + 1}`);
    }
    window.scrollTo(0, 0);
  };

  const onPrevPageClick = () => {
    setPage((prev) => prev - 1);
    if (rentPage) {
      navigate(`/rent/${clubName}?page=${page - 1}`);
    } else {
      navigate(`/manage?page=${page - 1}`);
    }
    window.scrollTo(0, 0);
  };

  const openModal = (id: number) => {
    open();
    if (rentPage) {
      navigate(`/rent/${clubName}/detail/${id}`);
    }
  };

  const id = Math.floor(Math.random() * 10) + 1;

  useEffect(() => {
    setPage(1);
    refetch();
  }, [activeClub]);

  return (
    <>
      <S.SectionContainer>
        {/* {data?.books.map(({ id, canRent, club }, i) => ( */}
        <S.SectionImageContainer>
          <S.SectionImage src={Book1PNG} onClick={() => openModal(id)} />
          <S.SectionImageTitleContainer>
            <S.SectionImageTitle onClick={() => openModal(id)}>세이노의 가르침</S.SectionImageTitle>
            <S.SectionImageSubTitle>세이노 · 데이원</S.SectionImageSubTitle>
            <StatusMessage />
          </S.SectionImageTitleContainer>
          {/* 
          
          const Rent = () => {
              if (rendPage) return <div/
              if (manageClubCanRend) return <div/
          }
          */}
        </S.SectionImageContainer>
        {/* ))} */}
      </S.SectionContainer>
      {!isLoading && data?.totalPages !== 0 && data?.books.length !== 0 && (
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
      )}
      {/* {isLoading ? <Skeleton isRentPage={rentPage || false} /> : <></>} */}
    </>
  );
};
