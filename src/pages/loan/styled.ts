import styled from 'styled-components';

export const SectionContainer = styled.section`
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
  & > div:not(:last-child) {
    margin-right: 2.5rem;
  }
`;

export const BookContainer = styled.div`
  width: fit-content;
  word-wrap: normal;
`;

export const Book = styled.img`
  width: 12.8rem;
`;

export const BookTitle = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
  margin-top: 0.8rem;
  display: block;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: all 0.3s ease;
  width: 12.8rem;
`;
