import styled, { css } from 'styled-components';

export const TextColumnContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  row-gap: 1rem;
`;

export const TextElement = styled.p<{ size: string }>`
  width: 100%;
  color: ${({ theme }) => theme.black};
  ${({ size }) => {
    switch (size) {
      case 'large':
        return css`
          font-size: 4rem;
          font-weight: 650;
        `;
      case 'medium':
        return css`
          font-size: 2.5rem;
          font-weight: 650;
        `;
      default:
        return css`
          font-size: 1.4rem;
          font-weight: 400;
          @media screen and (max-width: 2600px) and (min-width: 1000px) {
            font-size: 1.2rem;
          }
        `;
    }
  }}
`;
