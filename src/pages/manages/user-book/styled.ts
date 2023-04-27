import { Link } from 'react-router-dom';

import styled, { css } from 'styled-components';

export const ManagePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

export const ManageMessage = styled.span`
  width: 100%;
  padding: 1.4rem;
  border-radius: 0.4rem;
  font-size: 1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.primary.black};
  background-color: #ffcfcf;
  text-align: left;
  margin-bottom: 2rem;
`;

export const ManagePageSubTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.black};
`;

export const TeamList = styled.div`
  margin-bottom: 2rem;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.4rem;
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
          background-color: ${props.theme.black};
        `
      : css`
          color: ${props.theme.black};
          background-color: ${props.theme.primary.white};
        `}
`;

export const ManagePageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
`;
