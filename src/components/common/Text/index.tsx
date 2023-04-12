import * as S from './styled';

interface TextCommonProps {
  children?: React.ReactNode;
}

export type TextColumnProps = TextCommonProps;

export const TextColumn: React.FC<TextColumnProps> = ({ children }) => {
  return <S.TextColumnContainer>{children}</S.TextColumnContainer>;
};

interface TextProps extends TextCommonProps {
  size: 'small' | 'large' | 'medium';
}

export const TextComponent: React.FC<TextProps> = ({ children, size }) => {
  return <S.TextElement size={size}>{children}</S.TextElement>;
};

export const Text = Object.assign(TextComponent, {
  Column: TextColumn,
});
