import styled from 'styled-components';

export const ModalContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  row-gap: 2rem;
  width: 100%;
`;

export const ModalTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
`;

export const ReturnBookModalContainer = styled.div`
  padding: 0.8rem 0;
  align-self: center;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  row-gap: 1.6rem;
`;

export const ReturnBookModalTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 550;
  color: #828282;
`;

export const ReturnBookModalMessage = styled.span`
  font-size: 0.85rem;
  font-weight: 550;
  line-height: 1.2rem;
  color: #828282;
  text-align: center;
  margin-bottom: 0.4rem;
`;
