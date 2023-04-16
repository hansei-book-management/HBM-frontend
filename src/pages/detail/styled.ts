import { ImQuotesLeft } from 'react-icons/im';
import { FaStar } from 'react-icons/fa';

import styled, { css } from 'styled-components';

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 40px;
`;

export const DetailSection = styled.div<{ textSection: boolean }>`
  display: flex;
  flex-direction: ${({ textSection }) => (textSection ? 'column' : 'row')};
  align-items: flex-start;
  column-gap: 3.5rem;
  row-gap: 2rem;
  padding: 155px 0;
  height: 100%;
`;

export const DetailImage = styled.img`
  height: 30rem;
  border: 1px solid ${({ theme }) => theme.imageBorder};
`;

export const DetailInfoContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  height: 30rem;
  /* row-gap: 4rem; */
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
  margin-top: 3rem;
  display: flex;
  flex-direction: row;
  padding: 1rem 1.4rem;
  border-radius: 1.4rem;
  border: 1px solid #dddddd;
  width: fit-content;
  column-gap: 1rem;
  align-items: center;
  justify-content: space-between;
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

export const DetailBookIntro = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1.4rem;
  width: 100%;
  padding-bottom: 3rem;
  border-bottom: 1px solid ${({ theme }) => theme.imageBorder};
`;

export const DetailBookIntroTitle = styled.h3<{ size: string }>`
  color: ${({ theme }) => theme.black};
  ${({ size }) => {
    switch (size) {
      case 'large':
        return css`
          font-size: 1.4rem;
          font-weight: 700;
        `;
      case 'medium':
        return css`
          font-size: 1rem;
          font-weight: 600;
        `;
      default:
        return css`
          font-size: 0.8rem;
          line-height: 1.4rem;
          font-weight: 400;
          color: ${({ theme }) => theme.gray};
        `;
    }
  }}
`;

export const DetailBookIntroBottom = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1.2rem;
`;

export const DetailBookIntroBottomTitle = styled.h3`
  color: ${({ theme }) => theme.black};
  font-size: 1rem;
  font-weight: 700;
  line-height: normal;
`;

export const DetailBookIntroBottomText = styled.p`
  color: ${({ theme }) => theme.gray};
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.1rem;
`;
