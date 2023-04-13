import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Book1PNG } from '@/assets';

import * as S from './styled';

interface Book {
  rent?: boolean;
  timeOver?: boolean;
  timeLeftText?: string;
}

interface SectionProps {
  bookList: Book[];
}

const PER_PAGE = 16;

export const Section: React.FC<SectionProps> = ({ bookList }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const isRentPage = location.pathname.includes('/rent');
  const totalPages = Math.ceil(bookList.length / PER_PAGE);
  const visibleBooks = bookList.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <S.SectionContainer>
        {visibleBooks.map(({ rent, timeOver, timeLeftText }, i) => (
          <S.ImageContainer key={i}>
            <S.Image src={Book1PNG} onClick={() => navigate(`/detail/${i}`)} />
            {!isRentPage && (
              <S.ImageWrapper>
                <S.ImageMangeInfo timeOver={timeOver || false}>
                  <S.ImageMangeIcon />
                  <S.ImageMangeInfoText>
                    {!timeOver ? timeLeftText : timeLeftText + ' 연체중'}
                  </S.ImageMangeInfoText>
                </S.ImageMangeInfo>
              </S.ImageWrapper>
            )}
            <S.TitleContainer>
              <S.ImageTitle to={`/detail/${i}`}>세이노의 가르침 id:{i}</S.ImageTitle>
              <S.ImageSubTitle>세이노 · 데이원</S.ImageSubTitle>
              {isRentPage && (
                <S.RentMessage canRent={rent || false}>
                  {rent ? '대여 가능' : '대여 불가'}
                </S.RentMessage>
              )}
            </S.TitleContainer>
          </S.ImageContainer>
        ))}
      </S.SectionContainer>
      {isRentPage && (
        <S.PaginationContainer>
          <S.PaginationIconLeft size="1.5rem" onClick={handlePrevClick} />
          {[...Array(totalPages).keys()].map((page) => (
            <S.PaginationItem
              key={page + 1}
              onClick={() => handlePageClick(page + 1)}
              isSelected={currentPage === page + 1}
            >
              {page + 1}
            </S.PaginationItem>
          ))}
          <S.PaginationIconRight size="1.5rem" onClick={handleNextClick} />
        </S.PaginationContainer>
      )}
    </>
  );
};
