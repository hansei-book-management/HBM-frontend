import styled from 'styled-components';

export const FooterSectionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding-top: 20rem;
  row-gap: 20px;
  div > p {
    text-align: center;
  }
  @media screen and (max-width: 779px) and (min-width: 300px) {
    padding-top: 10rem;
  }
`;
