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
