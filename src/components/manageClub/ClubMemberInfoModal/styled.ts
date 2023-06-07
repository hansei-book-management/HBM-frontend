import styled from 'styled-components';

export const ModalUserContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  gap: 0.8rem;
`;

export const ModalTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
`;

export const ModalUserBookInfoText = styled.span`
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 2rem;
`;

export const ModalUserBookInfo = styled.div`
  display: flex;
`;

export const ModalUserBookInfoTitle = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
`;

export const ModalUserBookInfoStatus = styled(ModalUserBookInfoTitle)<{ isOk: boolean }>`
  margin-left: 0.8rem;
  color: ${({ isOk, theme }) => (isOk ? theme.primary.green : theme.primary.red)};
`;
