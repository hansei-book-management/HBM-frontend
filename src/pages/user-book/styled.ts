import styled from 'styled-components';

export const ManageUserBookContainer = styled.div<{ noData?: boolean }>`
  display: flex;
  flex-direction: column;
  height: ${({ noData }) => (noData ? '75vh' : 'auto')};
  row-gap: 1rem;
`;

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

export const DetailModalMessage = styled.span<{ isOk: boolean }>`
  margin-top: 0.6rem;
  font-size: 0.9rem;
  font-weight: 700;
  color: ${({ theme, isOk }) => (isOk ? theme.primary.green : theme.primary.red)};
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
