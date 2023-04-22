import styled, { keyframes } from 'styled-components';

export const modalChanagePageKeyframes = keyframes`
    0% {
        opacity: 0;
        transform: opacity(0.2);
    }

    100% {
        opacity: 1;
        transform: opacity(1);
    }
`;

export const ModalTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: 700;
  @media screen and (min-width: 300px) and (max-width: 580px) {
    display: none;
  }
`;

export const MobileModalTitle = styled.h1`
  display: none;
  @media screen and (min-width: 300px) and (max-width: 580px) {
    display: block;
    font-size: 2.2rem;
    font-weight: 700;
    margin-bottom: 2rem;
  }
`;

export const ModalImage = styled.img`
  width: 16rem;
  border: 1px solid ${({ theme }) => theme.imageBorder};
  @media screen and (min-width: 500px) and (max-width: 580px) {
    width: 17.5rem;
  }
  @media screen and (min-width: 300px) and (max-width: 580px) {
    justify-self: center;
    align-self: center;
  }
`;

export const ModalInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  row-gap: 0.5rem;
  margin-left: 2.4rem;
  @media screen and (min-width: 300px) and (max-width: 580px) {
    margin-top: 2rem;
    margin-left: 0;
  }
`;

export const ModalSubTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 550;
  line-height: 1.8rem;
`;

export const ModalInfo = styled.p`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.6rem;
  margin: 1rem 0;
`;

export const ModalContentTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 550;
  margin-top: 1rem;
`;

export const ModalContent = styled.p`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.6rem;
`;

export const ModalLastContainer = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  > * {
    line-height: 2rem;
  }
`;

export const ModalDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  gap: 1.4rem;
  flex-direction: row;
  @media screen and (min-width: 300px) and (max-width: 580px) {
    flex-direction: column;
  }
`;
