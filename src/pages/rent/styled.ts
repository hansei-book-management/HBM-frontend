import { Link } from 'react-router-dom';

import styled, { css } from 'styled-components';

export const RentPageContainer = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  row-gap: 3rem;
`;

export const TeamList = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  column-gap: 2rem;
  margin-bottom: 0.8rem;
`;

export const TeamLink = styled(Link)<{ isActive: boolean }>`
  padding: 0.75rem 1rem;
  border-radius: 1.2rem;
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 500;
  transition: background 150ms;
  ${(props) =>
    props.isActive
      ? css`
          color: ${props.theme.primary.white};
          background-color: ${props.theme.primary.black};
        `
      : css`
          color: ${props.theme.primary.black};
          background-color: ${props.theme.primary.white};
        `}
`;

export const RentPageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
`;

export const SectionContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: flex-start;
  row-gap: 8rem;
  margin-bottom: 3.6rem;
  @media screen and (max-width: 1000px) and (min-width: 700px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 700px) and (min-width: 300px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Image = styled.img`
  width: 16rem;
  border: 1px solid #eaeaea;
  @media screen and (max-width: 500px) and (min-width: 300px) {
    width: 12rem;
  }
  @media screen and (max-width: 380px) and (min-width: 300px) {
    width: 9rem;
  }
`;
