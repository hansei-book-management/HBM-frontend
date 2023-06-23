import { FaPlus } from 'react-icons/fa';

import { GetAllClubsResponse, GetUserBooksResponse } from '@/api';
import { ManageClubBookOptionItem } from '@/constant';

import * as S from './styled';

interface HeaderSectionProps {
  manageUserBookPage?: boolean;
  showPlusIcon?: boolean;
  userBookInfo?: string;
  name?: React.ReactNode;
  href: string;
  list?: GetAllClubsResponse[] | GetUserBooksResponse[];
  optionList?: ManageClubBookOptionItem[];
  rentClubList?: GetUserBooksResponse[];
  onClick?: () => void;
  activeId?: string;
  userMessage?: string;
}

export const HeaderSection: React.FC<HeaderSectionProps> = ({
  manageUserBookPage = false,
  name,
  href,
  list,
  showPlusIcon = false,
  onClick,
  activeId,
  userBookInfo,
  userMessage,
  optionList,
  rentClubList,
}) => {
  const isActive = (activeId?: string, id?: string) => activeId === id;

  const rentBookClub = rentClubList?.map(({ book }) => book.some(({ end }) => end !== 0));

  return (
    <S.HeaderSectionContainer manageUserBookPage={manageUserBookPage}>
      {userMessage && <S.HeaderSectionUserMessage>{userMessage}</S.HeaderSectionUserMessage>}
      {userBookInfo && <S.HeaderSectionSubTitle>{userBookInfo}</S.HeaderSectionSubTitle>}
      {name && (
        <S.HeaderSectionTitle manageUserBookPage={manageUserBookPage}>
          {rentClubList ? rentBookClub?.includes(true) && name : name}
        </S.HeaderSectionTitle>
      )}
      <S.HeaderSectionList manageUserBookPage={manageUserBookPage}>
        {list ? (
          <>
            {list.map(({ name, book }) => {
              if (book.length > 0) {
                return (
                  <S.HeaderSectionItem
                    key={name}
                    isActive={isActive(activeId, name)}
                    to={`${href}/${name}`}
                  >
                    {name}
                  </S.HeaderSectionItem>
                );
              }
              return null;
            })}
          </>
        ) : optionList ? (
          <>
            {optionList.map(({ name, id }) => (
              <S.HeaderSectionItem
                key={name}
                isActive={isActive(activeId, id)}
                to={`${href}/${id}`}
              >
                {name}
              </S.HeaderSectionItem>
            ))}
          </>
        ) : (
          <>
            {rentClubList?.map(({ name, book }, i) => {
              if (book.length > 0 && rentBookClub && rentBookClub[i]) {
                return (
                  <S.HeaderSectionItem
                    key={name}
                    isActive={isActive(activeId, name)}
                    to={`${href}/${name}`}
                  >
                    {name}
                  </S.HeaderSectionItem>
                );
              }
              return null;
            })}
          </>
        )}
        {showPlusIcon && (
          <S.HeaderSectionAddIconWrap onClick={onClick}>
            <FaPlus size={'0.9rem'} />
          </S.HeaderSectionAddIconWrap>
        )}
      </S.HeaderSectionList>
    </S.HeaderSectionContainer>
  );
};
