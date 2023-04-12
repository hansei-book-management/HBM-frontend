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
`;

export const ApplyButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 40px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.primary.purple};
  color: ${({ theme }) => theme.white};
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
`;
