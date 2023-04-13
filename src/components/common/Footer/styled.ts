import { Link } from 'react-router-dom';

import styled from 'styled-components';

export const FooterContainer = styled.footer`
  border-top: 1px solid #d5d5d5;
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 2rem;
`;

export const FooterTitle = styled(Link)`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.black};
  text-decoration: none;
  @media screen and (max-width: 500px) and (min-width: 300px) {
    font-size: 1.4rem;
  }
`;

export const FooterIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 10px;
`;

export const IconWrapper = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  padding: 0.4rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.primary.white};
  color: ${({ theme }) => theme.gray};
`;

export const FooterText = styled.p`
  font-size: 0.9rem;
  font-weight: 400;
  color: ${({ theme }) => theme.black};
  text-align: center;
  @media screen and (max-width: 500px) and (min-width: 300px) {
    font-size: 0.8rem;
  }
`;
