import { Link } from 'react-router-dom';

import styled, { css } from 'styled-components';

export const TeamPageContainer = styled.section`
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
  row-gap: 0.4rem;
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
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary.black};
  }
`;

export const TeamPageTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: 700;
`;
