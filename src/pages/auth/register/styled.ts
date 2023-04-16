import styled from 'styled-components';

export const RegisterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 155px 0;
  padding-bottom: 0;
`;

export const RegisterContainer = styled.form`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.imageBorder};
  border-radius: 2rem;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  width: 40%;
`;

export const RegisterBackButton = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
  width: 40%;
`;

export const RegisterInput = styled.input`
  background-color: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => theme.imageBorder};
  padding: 14px;
  align-self: center;
  border-radius: 0.8rem;
  height: 3rem;
  width: 100%;
  &::placeholder {
    font-size: 1rem;
    font-weight: 500;
    color: '#9E9E9E';
  }
`;

export const RegisterRoleSelect = styled.select`
  background-color: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => theme.imageBorder};
  padding: 14px;
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

export const RegisterButton = styled.button`
  background-color: ${({ theme }) => theme.primary.darkBlue};
  border: none;
  padding: 14px 0;
  align-self: center;
  border-radius: 0.8rem;
  height: 3rem;
  width: 100%;
  color: ${({ theme }) => theme.white};
  font-size: 1.2rem;
  font-weight: 600;
`;
