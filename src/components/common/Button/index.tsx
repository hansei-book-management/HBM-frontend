import * as S from './styled';

export interface ButtonProps {
  to: string;
  description: string;
}

export const Button: React.FC<ButtonProps> = ({ to, description }) => {
  return <S.ApplyButton to={to}>{description}</S.ApplyButton>;
};
