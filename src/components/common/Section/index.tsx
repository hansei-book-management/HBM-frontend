import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';

import { Book1PNG } from '@/assets';

import * as S from './styled';

export interface Book {
  rent?: boolean;
  timeOver?: boolean;
  timeLeftText?: string;
  id?: number;
  title?: string;
}

interface SectionProps {
  bookList: Book[];
}

export interface BookItem {
  books: Book[];
  totalPages: number;
  totalResults: number;
}

export const Section: React.FC<SectionProps> = ({ bookList }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isRentPage = location.pathname.includes('/rent');
  const [page, setPage] = useState(1);

  const getApi = async (page: number) => {
    const res = await fetch(`http://localhost:3000/all/?page=${page}`);
    const data = await res.json();
    return data;
  };

  const { data, isLoading } = useQuery<BookItem>(['bookList', page || 1], () => getApi(page));

  const onNextPageClick = () => {
    setPage((prev) => prev + 1);
  };

  const onPrevPageClick = () => {
    setPage((prev) => prev - 1);
  };

  return (
    <S.SectionContainer>
      {data?.books.map(({ id }, i) => (
        <S.ImageContainer key={i}>
          <S.Image src={Book1PNG} onClick={() => navigate(`/detail/${i}`)} />
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
            <S.ImageTitle to={`/detail/${i}`}>세이노의 가르침 id:{i}</S.ImageTitle>
            <S.ImageSubTitle>세이노 · 데이원</S.ImageSubTitle>
            {
              isRentPage && <S.RentMessage canRent={false}>대여 불가</S.RentMessage>
              // <S.RentMessage canRent={rent}>{rent ? 대여 가능 : 대여 불가}</S.RentMessage>
            }
          </S.TitleContainer>
        </S.ImageContainer>
      ))}
      <div>
        {page > 1 ? <button onClick={onPrevPageClick}>&larr;</button> : <div></div>}
        <span>
          Page {page} of {data?.totalPages}
        </span>
        {page !== data?.totalPages ? (
          <button onClick={onNextPageClick}>&rarr;</button>
        ) : (
          <div></div>
        )}
      </div>
    </S.SectionContainer>
  );
};
