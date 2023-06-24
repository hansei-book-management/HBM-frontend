import styled from 'styled-components';

export const BookPageContainer = styled.section<{ noData?: boolean }>`
  display: flex;
  flex-direction: column;
  height: ${({ noData }) => (noData ? '75vh' : 'auto')};
  row-gap: 1rem;
`;

export const NoDataMessageWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 2rem;
  row-gap: 2rem;
`;
