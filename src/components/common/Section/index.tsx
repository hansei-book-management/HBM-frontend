import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { rows } from '@/constant';
import { Book1PNG } from '@/assets';

import * as S from './styled';

export interface SectionContainerProps {
  start: number;
  end: number;
}

const SectionContainer: React.FC<SectionContainerProps> = ({ start, end }) => {
  const navigate = useNavigate();
  const rowList = useMemo(() => rows.slice(start, end), [start, end]);

  const onClick = (id: any) => {
    console.log(id);
    navigate(`/detail/${id}`);
  };

  return (
    <S.SectionContainer>
      {rowList.map(({ id, rent }) => (
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
  );
};

export const Section: React.FC = () => {
  const sectionList = useMemo(() => {
    const sectionSize = 5;
    const sectionList = [];
    for (let i = 0; i < rows.length; i += sectionSize) {
      sectionList.push({ start: i, end: i + sectionSize });
    }
    return sectionList;
  }, []);

  return (
    <>
      {sectionList.map(({ start, end }) => (
        <SectionContainer start={start} end={end} />
      ))}
    </>
  );
};
