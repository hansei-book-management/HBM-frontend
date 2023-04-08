import styled from 'styled-components';

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const SubTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  margin-bottom: 0.8rem;
`;

export const MainTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin: 0;
  margin-bottom: 3rem;
`;

export const Slider = styled.div`
  display: flex;
  overflow: scroll;
  width: 100%;
  align-items: flex-start;
`;

export const ImageContainer = styled.div`
  width: fit-content;
  word-wrap: normal;
  margin-right: 3rem;
`;

export const Image = styled.img`
  width: 12.8rem;
`;
