import { useNavigate } from 'react-router-dom';

import { useModal } from '@/hooks';
import { StatusMessage } from '@/components';
import { BookListProps } from '@/api';

import * as S from './styled';

export interface SectionProps {
  data?: [BookListProps] | BookListProps[];
  navigateUrl?: string;
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

  return (
    <>
      <S.SectionContainer>
        {data?.map(({ data, bid, end, user }, i) => {
          const bookInfo = data.items[0];
          console.log(user, end);
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
                <StatusMessage
                  canRent={end === 0}
                  userName={user?.name}
                  userBlock={user?.freeze === 0}
                />
              </S.SectionImageTitleContainer>
            </S.SectionImageContainer>
          );
        })}
      </S.SectionContainer>
    </>
  );
};
