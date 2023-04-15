import { ImQuotesLeft } from 'react-icons/im';
import { FaStar } from 'react-icons/fa';

import styled from 'styled-components';

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: flex-start; */
  row-gap: 2rem;
`;

export const DetailSection = styled.div`
  display: flex;
  align-items: flex-start;
  column-gap: 3.5rem;
`;

export const DetailImage = styled.img`
  width: 20rem;
  border: 1px solid ${({ theme }) => theme.imageBorder};
`;

export const DetailInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  row-gap: 3rem;
  justify-content: space-between;
`;

export const DetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
`;

export const DetailInfoText = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.gray};
  margin-top: 1rem;
`;

export const BookReviewContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1rem 1.4rem;
  border-radius: 1.4rem;
  border: 1px solid #dddddd;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;

export const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.4rem;
  align-items: center;
  justify-content: center;
`;

export const QuoteIcon = styled(ImQuotesLeft)`
  width: 1.2rem;
  height: 1.2rem;
  color: ${({ theme }) => theme.primary.darkBlue};
`;

export const ReviewIcon = styled(FaStar)`
  width: 1.2rem;
  height: 1.2rem;
  color: ${({ theme }) => theme.primary.green};
`;

export const BookReviewContainerLine = styled.span`
  width: 1px;
  height: 2.2rem;
  background-color: #dddddd;
  border: 1px solid #dddddd;
`;

export const InfoText = styled.p<{ num: boolean }>`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme, num }) => (num ? theme.primary.green : theme.primary.darkBlue)};
`;

export const ReviewText = styled.p`
  font-size: 0.7rem;
  font-weight: 400;
  color: ${({ theme }) => theme.gray};
`;
