import { FaPlus } from 'react-icons/fa';

import { ManageClubBookOptionItem } from '@/constant';
import { GetAllClubsResponse, GetUserBooksResponse } from '@/api';

import * as S from './styled';

export interface HeaderSectionProps {
  manageUserBookPage?: boolean;
  notShowPlusIcon?: boolean;
  userBookInfo?: string;
  name?: React.ReactNode;
  href: string;
  list?: GetAllClubsResponse[] | ManageClubBookOptionItem[];
  userClubList?: GetUserBooksResponse[];
  onClick?: () => void;
  activeId?: string;
  userMessage?: string;
}

export const HeaderSection: React.FC<HeaderSectionProps> = ({
  manageUserBookPage,
  name,
  href,
  list,
  notShowPlusIcon,
  onClick,
  activeId,
  userBookInfo,
  userMessage,
  userClubList,
}) => {
  const isActive = (activeId?: string, id?: string) => activeId === id;
  return (
    <S.HeaderSectionContainer manageUserBookPage={manageUserBookPage || false}>
      {userMessage && <S.HeaderSectionUserMessage>{userMessage}</S.HeaderSectionUserMessage>}
      {userBookInfo && <S.HeaderSectionSubTitle>{userBookInfo}</S.HeaderSectionSubTitle>}
      <S.HeaderSectionTitle manageUserBookPage={manageUserBookPage || false}>
        {name}
      </S.HeaderSectionTitle>
      <S.HeaderSectionList manageUserBookPage={manageUserBookPage || false}>
        {list
          ? list.map(({ name }) => (
              <S.HeaderSectionItem
                key={name}
                isActive={isActive(activeId, name)}
                to={`${href}/${name}`}
              >
                {name}
              </S.HeaderSectionItem>
            ))
          : userClubList?.map(({ cid }) => (
              <S.HeaderSectionItem
                key={cid}
                isActive={isActive(activeId, cid.toString())}
                to={`${href}/${name}`}
              >
                {name}
              </S.HeaderSectionItem>
            ))}
        {!notShowPlusIcon && (
          <S.HeaderSectionAddIconWrap onClick={onClick}>
            <FaPlus size={'0.9rem'} />
          </S.HeaderSectionAddIconWrap>
        )}
      </S.HeaderSectionList>
    </S.HeaderSectionContainer>
  );
};
