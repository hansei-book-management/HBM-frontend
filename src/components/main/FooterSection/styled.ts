import { Link } from 'react-router-dom';

import styled from 'styled-components';

export const FooterSectionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 155px 0;
  row-gap: 20px;
  div > p {
    text-align: center;
  }
  @media screen and (max-width: 779px) and (min-width: 300px) {
    padding: 80px 0;
  }
`;

export const ApplyButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2.4rem;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.primary.purple};
  color: ${({ theme }) => theme.white};
  font-size: 1.2rem;
  font-weight: 600;
  text-decoration: none;
  @media screen and (max-width: 2600px) and (min-width: 1000px) {
    font-size: 1.2rem;
  }
`;
