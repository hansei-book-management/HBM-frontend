import styled from 'styled-components';

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  gap: 1.4rem;
`;

export const ModalTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: 700;
`;

export const ModalSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: 0.6rem;
`;

export const ModalSelectTitle = styled.h3`
  font-size: 1rem;
  font-weight: 500;
`;

export const ModalSelect = styled.select`
  background-color: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => theme.imageBorder};
  padding: 0 14px;
  align-self: center;
  border-radius: 0.8rem;
  height: 3rem;
  width: 100%;
  caret-color: auto;
  appearance: none;
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.black};
`;
