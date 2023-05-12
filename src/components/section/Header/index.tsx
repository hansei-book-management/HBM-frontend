import * as S from './styled';

export interface HeaderSectionProps {
  manageUserBookPage: boolean;
}

export const HeaderSection: React.FC<HeaderSectionProps> = ({ manageUserBookPage }) => {
  return (
    <S.HeaderSectionContainer>
      <S.HeaderSectionTitle manageUserBookPage={manageUserBookPage}>sadf</S.HeaderSectionTitle>
    </S.HeaderSectionContainer>
  );
};
