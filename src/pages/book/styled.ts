import styled from 'styled-components';

export const BookPageContainer = styled.section<{ noData?: boolean }>`
  display: flex;
  flex-direction: column;
  height: ${({ noData }) => (noData ? '75vh' : 'auto')};
  row-gap: 1rem;
`;
