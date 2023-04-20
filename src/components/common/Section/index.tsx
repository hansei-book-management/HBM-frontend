import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';

import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { useRecoilState } from 'recoil';

import { Book1PNG } from '@/assets';
import { ClubItem } from '@/constant';
import { ModalState } from '@/atoms';

import { RentMessage } from '../RentMessage';
import { Modal } from '../Modal';

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
  const [modalActive, setModalActive] = useRecoilState(ModalState);

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
    console.log(page);
    if (isRentPage) {
      navigate(`/rent/${clubName}?page=${page + 1}`);
    } else {
      navigate(`/manage?page=${page + 1}`);
    }
  };

  const onPrevPageClick = () => {
    setPage((prev) => prev - 1);
    if (isRentPage) {
      navigate(`/rent/${clubName}?page=${page - 1}`);
    } else {
      navigate(`/manage?page=${page - 1}`);
    }
  };

  const openModal = (id: number) => {
    setModalActive(true);
    navigate(`?/id=${id}`);
  };

  useEffect(() => {
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
      {modalActive && (
        <Modal
          title="세노이의 가르침"
          info={
            <>
              세이노 저자(글)
              <br />
              데이원 · 2023년 03월 02일
            </>
          }
          subTitle={
            <>
              ㆍ 머릿글: 초판 한정 블랙 에디션
              <br />
              재야의 명저 《세이노의 가르침》 2023년판 정식 출간!
              <br />
              순자산 천억 원대 자산가, 세이노의 ‘요즘 생각’을 만나다
            </>
          }
          description="2000년부터 발표된 그의 주옥같은 글들. 독자들이 자발적으로 만든 제본서는 물론, 전자책과 앱까지 나왔던 《세이노의 가르침》이 드디어 전국 서점에서 독자들을 마주한다. 여러 판본을 모으고 저자의 확인을 거쳐 최근 생각을 추가로 수록하였다. 정식 출간본에만 추가로 수록된 글들은 목차와 본문에 별도 표시하였다.더 많은 사람이 이 책을 보고 힘을 얻길 바라기에 인세도 안 받는 저자의 마음을 담아, 700쪽이 넘는 분량에도 7천 원 안팎에 책을 구매할 수 있도록 했다. 정식 출간 전자책 또한 무료로 선보인다.*필명 ‘세이노(Say No)’는 당신이 믿고 있는 것들에 ‘No!’를 외치고 제대로 살아가라는 뜻이다. 세이노는 지난 20여 년간 여러 칼럼을 통해 인생 선배로서 부와 성공에 대한 지혜와 함께 삶에 대한 체험적 지식을 나누어 주었다. 그래서 그의 글을 좋아하는 사람들은 그를 ‘세이노 스승님’이라 부른다."
        />
      )}
    </>
  );
};
