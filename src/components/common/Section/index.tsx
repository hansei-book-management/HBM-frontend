import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';

import axios from 'axios';

import { Book1PNG } from '@/assets';
import { ClubItem } from '@/constant';
import { useModal } from '@/hooks/useModal';

import { RentMessage } from '../RentMessage';

import * as S from './styled';

export interface SectionProps {
  activeClub?: ClubItem;
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

export const Section: React.FC<SectionProps> = ({ activeClub }) => {
  const [page, setPage] = useState(1);
  const { open } = useModal();

  const location = useLocation();
  const navigate = useNavigate();
  const isRentPage = location.pathname.includes('/rent');

  const clubName = activeClub?.id;

  const getRentApi = async (clubName: string, page: number) => {
    const res = await axios.get(`http://localhost:3003/rent/${clubName}?page=${page}`);
    return res.data;
  };

  const getManageApi = async (page: number) => {
    const res = await axios.get(`http://localhost:3003/rent/ssr?page=${page}`);
    return res.data;
  };

  const { data, isLoading, refetch } = useQuery<BookItem>(['bookList', clubName, page], () => {
    if (isRentPage) {
      return getRentApi(clubName || '', page);
    } else {
      return getManageApi(page);
    }
  });

  const onNextPageClick = () => {
    setPage((prev) => prev + 1);
    if (isRentPage) {
      navigate(`/rent/${clubName}?page=${page + 1}`);
    } else {
      navigate(`/manage?page=${page + 1}`);
    }
    window.scrollTo(0, 0);
  };

  const onPrevPageClick = () => {
    setPage((prev) => prev - 1);
    if (isRentPage) {
      navigate(`/rent/${clubName}?page=${page - 1}`);
    } else {
      navigate(`/manage?page=${page - 1}`);
    }
    window.scrollTo(0, 0);
  };

  const openModal = (id: number) => {
    open();
    navigate(`/rent/${clubName}/detail/${id}`);
  };

  useEffect(() => {
    setPage(1);
    refetch();
  }, [activeClub]);

  return (
    <>
      <S.SectionContainer>
        {isLoading && <h1>로딩중...</h1>}
        {data?.books.map(({ id, canRent, club }, i) => (
          <S.ImageContainer key={i}>
            <S.Image src={Book1PNG} onClick={() => openModal(id)} />
            {!isRentPage && (
              <S.ImageWrapper>
                <S.ImageMangeInfo timeOver={false}>
                  {/* <S.ImageMangeInfo timeOver={timeOver}> */}
                  <S.ImageMangeIcon />
                  <S.ImageMangeInfoText>1일 12시간 연체중</S.ImageMangeInfoText>
                  {/* <S.ImageMangeInfoText>{timeOver ? timeLeftText + '연체중' : timeLeftText + '남음' } </S.ImageMangeInfoText>*/}
                </S.ImageMangeInfo>
              </S.ImageWrapper>
            )}
            <S.TitleContainer>
              <S.ImageTitle onClick={() => openModal(id)}>
                세이노의 가르침 id:{id}, {club}
              </S.ImageTitle>
              <S.ImageSubTitle>세이노 · 데이원</S.ImageSubTitle>
              {isRentPage && <RentMessage canRent={canRent} />}
            </S.TitleContainer>
          </S.ImageContainer>
        ))}
      </S.SectionContainer>
      {data?.totalPages !== 0 && (
        <S.PaginationContainer>
          {page > 1 ? (
            <S.PaginationButton onClick={onPrevPageClick} show={true}>
              &larr;
            </S.PaginationButton>
          ) : (
            <S.PaginationButton show={false}>&larr;</S.PaginationButton>
          )}
          <S.PaginationText>
            Page {page} of {data?.totalPages}
          </S.PaginationText>
          {page !== data?.totalPages ? (
            <S.PaginationButton onClick={onNextPageClick} show={true}>
              &rarr;
            </S.PaginationButton>
          ) : (
            <S.PaginationButton show={false}>&rarr;</S.PaginationButton>
          )}
        </S.PaginationContainer>
      )}
    </>
  );
};
