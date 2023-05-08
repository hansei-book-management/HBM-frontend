import styled from 'styled-components';

export const RegisterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
  padding-bottom: 3rem;
`;

export const RegisterContainer = styled.form`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.imageBorder};
  border-radius: 2rem;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  width: 30rem;
`;

export const RegisterBackButton = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
  width: 40%;
`;

export const RegisterInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.6rem;
`;

export const RegisterInputTitle = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  color: rgb(125, 128, 135);
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

export const RegisterErrorMessage = styled.p`
  text-align: left;
  margin-left: 10px;
  font-size: 13px;
  color: #ba1a1a;
`;
