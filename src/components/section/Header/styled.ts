import styled from 'styled-components';

export const HeaderSectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

export const HeaderSectionTitle = styled.h1<{ manageUserBookPage: boolean }>`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: ${({ manageUserBookPage }) => (manageUserBookPage ? '0' : '2rem')};
`;
