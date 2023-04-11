import { Link } from 'react-router-dom';

import styled from 'styled-components';

export const SectionContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: flex-start;
  gap: 2rem;
  margin-bottom: 3.6rem;
`;

export const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Image = styled.img`
  width: 215px;
  box-shadow: 0.1rem 0 0.5rem 0.1rem rgba(0, 0, 0, 0.1);
`;

export const TitleContainer = styled.div`
  margin-top: 0.8rem;
  display: flex;
  flex-direction: column;
  row-gap: 0.4rem;
`;

export const ImageTitle = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.black};
  font-size: 1rem;
  font-weight: 600;
  &:hover {
    text-decoration: underline;
  }
`;

export const ImageSubTitle = styled.span`
  font-size: 0.8rem;
  font-weight: 400;
  color: ${({ theme }) => theme.primary.black};
`;

export const RentMessage = styled.span<{ canRent: boolean }>`
  margin-top: 0.6rem;
  font-size: 0.9rem;
  font-weight: 900;
  color: ${({ theme, canRent }) => (canRent ? theme.primary.green : theme.primary.red)};
`;
