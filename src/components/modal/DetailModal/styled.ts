import styled from 'styled-components';

export const DetailModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  gap: 1.4rem;
  flex-direction: row;
  @media screen and (min-width: 300px) and (max-width: 580px) {
    gap: 0.4rem;
    flex-direction: column;
  }
`;

export const DetailModalTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: 700;
  line-height: 2.8rem;
  @media screen and (min-width: 300px) and (max-width: 580px) {
    display: none;
  }
`;

export const DetailModalMobileTitle = styled.h1`
  display: none;
  @media screen and (min-width: 300px) and (max-width: 580px) {
    display: block;
    font-size: 2.2rem;
    font-weight: 700;
    margin-top: 0.4rem;
    margin-right: 0.4rem;
  }
`;

export const DetailModalImage = styled.img`
  width: 16rem;
  border: 1px solid ${({ theme }) => theme.imageBorder};
  @media screen and (min-width: 500px) and (max-width: 580px) {
    width: 17.5rem;
  }
  @media screen and (min-width: 300px) and (max-width: 580px) {
    justify-self: center;
    margin-top: 2rem;
    align-self: center;
  }
`;

export const DetailModalInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  row-gap: 0.5rem;
  margin-left: 2.4rem;
  @media screen and (min-width: 300px) and (max-width: 580px) {
    /* margin-top: 2rem; */
    margin-left: 0;
  }
`;

export const DetailModalSubTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 550;
  line-height: 1.8rem;
`;

export const DetailModalInfoText = styled.p`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.6rem;
  margin: 1rem 0;
`;

export const DetailModalSummaryTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 550;
  margin-top: 1rem;
`;

export const DetailModalSummary = styled.p`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.6rem;
`;
