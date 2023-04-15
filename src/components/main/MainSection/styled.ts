import styled from 'styled-components';

export const MainSectionContainer = styled.div<{ isSecondary?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: ${(props) => (props.isSecondary ? ' row-reverse' : 'row')};
  justify-content: space-between;
  width: 100%;
  div > p {
    text-align: ${(props) => (props.isSecondary ? 'right' : 'left')};
  }
  padding: 155px 0;
  row-gap: 40px;
  @media screen and (max-width: 779px) and (min-width: 300px) {
    padding: 80px 0;
    align-items: flex-start;
    div {
      width: 100%;
    }
  }
`;

export const MainSectionImage = styled.img`
  width: 34rem;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.imageBorder};
  @media screen and (max-width: 779px) and (min-width: 500px) {
    width: 40rem;
  }
  @media screen and (max-width: 500px) and (min-width: 300px) {
    width: 100%;
  }
`;
