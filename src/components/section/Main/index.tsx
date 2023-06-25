import { useNavigate } from 'react-router-dom';

import { useModal } from '@/hooks';
import { NoDataMessage, StatusMessage } from '@/components';
import { BookListProps } from '@/api';

import * as S from './styled';

export interface SectionProps {
  data?: [BookListProps] | BookListProps[];
  navigateUrl?: string;
  userName?: string;
  userStatus?: boolean;
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
  const { open } = useModal();

  const navigate = useNavigate();

  const openModal = (bookId?: number) => {
    open();
    navigate(`${navigateUrl}/${bookId}`);
  };

  const isDataExist = data && data?.length > 0;
  console.log(data);

  return (
    <>
      {isDataExist ? (
        <S.SectionContainer>
          {data.map(({ data, bid, end, user }, i) => {
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
                  <StatusMessage canRent={end === 0} userName={user?.name} />
                </S.SectionImageTitleContainer>
              </S.SectionImageContainer>
            );
          })}
        </S.SectionContainer>
      ) : (
        <>
          <NoDataMessage
            message={
              `동아리에 아무런 도서가 없어요.\n` + `부장에게 도서를 추가해달라고 요청해보세요!`
            }
            showBtn={false}
            isSection={true}
          />
        </>
      )}
    </>
  );
};
