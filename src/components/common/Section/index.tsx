import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Book1PNG } from '@/assets';

import * as S from './styled';

interface SectionProps {
  image: {
    id: number;
    rent: boolean;
  }[];
}

const PER_PAGE = 20;

export const Section: React.FC<SectionProps> = ({ image }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(image.length / PER_PAGE);
  const visibleRows = image.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

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
        {visibleRows.map(({ id, rent }) => (
          <S.ImageWrapper key={id}>
            <S.Image src={Book1PNG} onClick={() => navigate(`/detail/${id}`)} />
            <S.TitleContainer>
              <S.ImageTitle to={`/detail/${id}`}>세이노의 가르침 id:{id}</S.ImageTitle>
              <S.ImageSubTitle>세이노 · 데이원</S.ImageSubTitle>
              <S.RentMessage canRent={rent}>{rent ? '대여 가능' : '대여 불가'}</S.RentMessage>
            </S.TitleContainer>
          </S.ImageWrapper>
        ))}
      </S.SectionContainer>
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
    </>
  );
};
