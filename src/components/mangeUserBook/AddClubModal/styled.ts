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

export const ModalAddClubInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  row-gap: 0.4rem;
  width: 100%;
`;

export const AddClubModalInputText = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.black};
`;

export const AddClubModalInput = styled.input`
  background-color: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => theme.imageBorder};
  padding: 16px;
  align-self: center;
  border-radius: 0.8rem;
  height: 3rem;
  width: 100%;
  font-size: 1rem;
  &::placeholder {
    font-size: 1rem;
    font-weight: 500;
    color: '#9E9E9E';
  }
`;

export const StatusModalText = styled.h3`
  font-size: 1.1rem;
  font-weight: 550;
  line-height: 1.8rem;
  justify-self: center;
  align-self: center;
  text-align: center;
`;
