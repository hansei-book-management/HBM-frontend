import styled from 'styled-components';

export const RentMessage = styled.span<{ canRent: boolean }>`
  margin-top: 0.6rem;
  font-size: 0.9rem;
  font-weight: 900;
  color: ${({ theme, canRent }) => (canRent ? theme.primary.green : theme.primary.red)};
`;
