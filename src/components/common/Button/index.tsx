import * as S from './styled';

export interface ButtonProps {
  to: string;
  description: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ to, description, onClick }) => {
  return (
    <S.ApplyButton to={to} onClick={onClick}>
      {description}
    </S.ApplyButton>
  );
};
