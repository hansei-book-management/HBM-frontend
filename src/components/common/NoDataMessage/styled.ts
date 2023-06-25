import styled from 'styled-components';

export const NoDataMessageWrapper = styled.section<{ isSection: boolean }>`
  display: flex;
  flex-direction: column;
  height: ${({ isSection }) => (isSection ? '60vh' : '75vh')};
  row-gap: 1rem;
`;

export const NoDataMessageContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 2rem;
  row-gap: 2rem;
`;

export const NoDataMessage = styled.h1`
  font-size: 1.4rem;
  font-weight: 700;
  text-align: center;
`;
