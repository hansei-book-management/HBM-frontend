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
}) => {
  const isActive = (activeId?: string, id?: string) => activeId === id;

  return (
    <S.HeaderSectionContainer manageUserBookPage={manageUserBookPage}>
      {userMessage && <S.HeaderSectionUserMessage>{userMessage}</S.HeaderSectionUserMessage>}
      {userBookInfo && <S.HeaderSectionSubTitle>{userBookInfo}</S.HeaderSectionSubTitle>}
      {name && (
        <S.HeaderSectionTitle manageUserBookPage={manageUserBookPage}>{name}</S.HeaderSectionTitle>
      )}
      <S.HeaderSectionList manageUserBookPage={manageUserBookPage}>
        {list ? (
          <>
            {list.map(({ name }) => (
              <S.HeaderSectionItem
                key={name}
                active={isActive(activeId, name)}
                to={`${href}/${name}`}
              >
                {name}
              </S.HeaderSectionItem>
            ))}
          </>
        ) : (
          <>
            {optionList?.map(({ name, id }) => (
              <S.HeaderSectionItem key={name} active={isActive(activeId, id)} to={`${href}/${id}`}>
                {name}
              </S.HeaderSectionItem>
            ))}
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
