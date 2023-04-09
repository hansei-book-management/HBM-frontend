import styled from 'styled-components';

export const SectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-wrap: normal;
  text-align: left;
  display: flex;
  width: 86%;
  flex-direction: column;
  padding: 0px 1rem;
  margin-bottom: 7rem;
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
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  width: fit-content;
  /* & > div:not(:last-child, :first-child) {
  } */
`;

export const BookContainer = styled.div`
  word-wrap: normal;
  text-align: left;
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  margin-bottom: 7rem;
`;

export const Book = styled.img`
  width: 220px;
  transition: all 0.3s;
  &:hover {
    scale: 1.05;
    transition-duration: 0.15;
  }
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
  transition: text-decoration 0.3s ease-in-out;
  width: 220px;
  &:hover {
    text-decoration: underline ${(props) => props.theme.white};
  }
`;
