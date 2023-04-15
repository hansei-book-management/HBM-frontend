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
  border: 1px solid #eaeaea;
`;

export const DetailInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  row-gap: 1rem;
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

export const DetailIconsDiv = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1.2rem 0.4rem;
  border: 1px solid #dddddd;
  align-items: center;
  justify-content: center;
`;

export const DetailIconDiv = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.4rem;
  align-items: center;
  justify-content: center;
`;

export const DetailIcon = styled.img``;

export const RecommandText = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.primary.green};
`;

export const ReviewrText = styled.p`
  font-size: 0.6rem;
  font-weight: 400;
  color: ${({ theme }) => theme.gray};
`;
