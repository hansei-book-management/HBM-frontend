// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// import { rows } from '@/constant';
// import { Book1PNG } from '@/assets';

// import * as S from './styled';

// export const Section: React.FC = () => {
//   const navigate = useNavigate();

//   const onClick = (id: number) => {
//     navigate(`/detail/${id}`);
//   };

//   return (
//     <S.SectionContainer>
//       {rows.map(({ id, rent }) => (
//         <S.ImageWrapper key={id}>
//           <S.Image src={Book1PNG} onClick={() => onClick(id)} />
//           <S.TitleContainer>
//             <S.ImageTitle to={`/detail/${id}`}>세이노의 가르침 id:{id}</S.ImageTitle>
//             <S.ImageSubTitle>세이노 · 데이원</S.ImageSubTitle>
//             <S.RentMessage canRent={rent}>{rent ? '대여 가능' : '대여 불가'}</S.RentMessage>
//           </S.TitleContainer>
//         </S.ImageWrapper>
//       ))}
//     </S.SectionContainer>
//   );
// };

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { rows } from '@/constant';
import { Book1PNG } from '@/assets';

import * as S from './styled';

export const Section: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);

  const onClick = (id: number) => {
    navigate(`/detail/${id}`);
  };

  const totalPages = Math.ceil(rows.length / perPage);
  const start = (page - 1) * perPage;
  const end = start + perPage;

  const visibleRows = rows.slice(start, end);

  const handlePrevClick = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleNextClick = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <S.SectionContainer>
        {visibleRows.map(({ id, rent }) => (
          <S.ImageWrapper key={id}>
            <S.Image src={Book1PNG} onClick={() => onClick(id)} />
            <S.TitleContainer>
              <S.ImageTitle to={`/detail/${id}`}>세이노의 가르침 id:{id}</S.ImageTitle>
              <S.ImageSubTitle>세이노 · 데이원</S.ImageSubTitle>
              <S.RentMessage canRent={rent}>{rent ? '대여 가능' : '대여 불가'}</S.RentMessage>
            </S.TitleContainer>
          </S.ImageWrapper>
        ))}
      </S.SectionContainer>
      <div>
        <button onClick={handlePrevClick} disabled={page === 1}>
          이전
        </button>
        <span>
          {page} / {totalPages}
        </span>
        <button onClick={handleNextClick} disabled={page === totalPages}>
          다음
        </button>
      </div>
    </>
  );
};
