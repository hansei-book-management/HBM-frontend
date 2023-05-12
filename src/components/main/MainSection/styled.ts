import styled from 'styled-components';

export const MainSectionContainer = styled.div<{ isSecondary?: boolean; firstSection?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: ${(props) => (props.isSecondary ? ' row-reverse' : 'row')};
  justify-content: space-between;
  width: 100%;
  div > p {
    text-align: ${(props) => (props.isSecondary ? 'right' : 'left')};
  }
  padding-top: ${(props) => (props.firstSection ? '10rem' : '20rem')};
  row-gap: 40px;
  @media screen and (max-width: 779px) and (min-width: 300px) {
    padding-top: ${(props) => (props.firstSection ? '0' : '10rem')};
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
