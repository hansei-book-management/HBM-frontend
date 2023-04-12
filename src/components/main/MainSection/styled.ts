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
`;

export const MainSectionImage = styled.img`
  width: 30rem;
  border-radius: 20px;
  border: 1px solid #eaeaea;
`;
