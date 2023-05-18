import styled from 'styled-components';

export const ModalSuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  gap: 1.4rem;
  align-items: center;
  justify-content: center;
  padding-bottom: 1.5rem;
`;

export const ModalTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: 700;
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

export const ModalSubTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 550;
  line-height: 1.8rem;
  justify-self: center;
  align-self: center;
  text-align: center;
`;
