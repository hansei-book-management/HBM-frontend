import styled, { css } from 'styled-components';

export const TextColumnContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
  row-gap: 1rem;
`;

export const TextElement = styled.span<{ size: string }>`
  color: ${({ theme }) => theme.black};
  ${({ size }) => {
    switch (size) {
      case 'large':
        return css`
          font-size: 5rem;
          font-weight: 600;
        `;
      case 'small':
        return css`
          font-size: 1.4rem;
          font-weight: 400;
        `;
      default:
        return css`
          font-size: 1rem;
          font-weight: 400;
        `;
    }
  }}
`;
