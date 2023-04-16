import * as S from './styled';

interface TextCommonProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export type TextColumnProps = TextCommonProps;

export const TextColumn: React.FC<TextColumnProps> = ({ children, style }) => {
  return <S.TextColumnContainer style={style}>{children}</S.TextColumnContainer>;
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
