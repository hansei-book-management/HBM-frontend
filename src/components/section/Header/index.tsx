import { FaPlus } from 'react-icons/fa';

import * as S from './styled';

export interface HeaderSectionListProps {
  name: string;
  id: string;
  text?: string;
}

export interface HeaderSectionProps {
  manageUserBookPage?: boolean;
  rentPage?: boolean;
  name: React.ReactNode;
  href: string;
  list: HeaderSectionListProps[];
  onClick?: () => void;
  activeId?: string;
}

export const HeaderSection: React.FC<HeaderSectionProps> = ({
  manageUserBookPage,
  name,
  href,
  list,
  rentPage,
  onClick,
  activeId,
}) => {
  const isActive = (activeId?: string, id?: string) => activeId === id;
  return (
    <S.HeaderSectionContainer manageUserBookPage={manageUserBookPage || false}>
      <S.HeaderSectionTitle manageUserBookPage={manageUserBookPage || false}>
        {name}
      </S.HeaderSectionTitle>
      <S.HeaderSectionList>
        {list.map(({ name, id }) => (
          <S.HeaderSectionItem key={id} isActive={isActive(activeId, id)} to={`${href}/${id}`}>
            {name}
          </S.HeaderSectionItem>
        ))}
        {!rentPage && (
          <S.HeaderSectionAddIconWrap onClick={onClick}>
            <FaPlus size={'0.9rem'} />
          </S.HeaderSectionAddIconWrap>
        )}
      </S.HeaderSectionList>
    </S.HeaderSectionContainer>
  );
};
