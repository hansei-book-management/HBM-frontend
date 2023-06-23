import styled from 'styled-components';

export const StatusMessage = styled.span<{ isOk?: boolean }>`
  margin-top: 0.6rem;
  font-size: 0.9rem;
  font-weight: 700;
  color: ${({ theme, isOk }) => (isOk ? theme.primary.darkBlue : theme.primary.red)};
`;
