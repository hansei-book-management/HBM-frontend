import styled from 'styled-components';

export const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 14rem 0;
`;

export const LoginInput = styled.input`
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
