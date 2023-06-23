import * as S from './styled';

export interface RentMessageProps {
  canRent?: boolean;
  style?: React.CSSProperties;
}

export const RentMessage: React.FC<RentMessageProps> = ({ canRent, style }) => {
  return (
    <S.RentMessage canRent={canRent} style={style}>
      {canRent ? '대여 가능 ' : '대여 중'}
    </S.RentMessage>
  );
};
