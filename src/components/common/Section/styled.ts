import styled from 'styled-components';

export const SectionContainer = styled.section`
  display: flex;
  /* flex-wrap: wrap; */
  align-items: flex-start;
  gap: 2rem;
`;

export const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Image = styled.img`
  width: 212px;
  // shadow
  box-shadow: 0.1rem 0 0.5rem 0.1rem rgba(0, 0, 0, 0.1);
`;

export const TitleContainer = styled.div`
  margin-top: 0.8rem;
  display: flex;
  flex-direction: column;
  row-gap: 0.4rem;
`;

export const ImageTitle = styled.h2`
  font-size: 1rem;
  font-weight: 600;
`;

export const ImageSubTitle = styled.h3`
  font-size: 0.8rem;
  font-weight: 400;
  color: ${({ theme }) => theme.primary.black};
`;
