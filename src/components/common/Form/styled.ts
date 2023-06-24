import styled from 'styled-components';

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
`;

export const FormContainer = styled.form`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.imageBorder};
  border-radius: 2rem;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  width: 34rem;
  @media screen and (min-width: 300px) and (max-width: 500px) {
    width: 26rem;
    border: none;
    padding: 1rem;
  }
`;

export const FormTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
`;

export const FormButton = styled.button`
  background-color: ${({ theme }) => theme.primary.darkBlue};
  border: none;
  padding: 14px 0;
  border-radius: 2rem;
  align-self: center;
  height: 3rem;
  width: 100%;
  color: ${({ theme }) => theme.white};
  font-size: 1.2rem;
  font-weight: 600;
  opacity: 1;
  transition: opacity 150ms ease-in-out;
  &:hover {
    opacity: 0.8;
  }
  @media screen and (min-width: 300px) and (max-width: 500px) {
    height: 3.4rem;
  }
`;

export const FormInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.6rem;
`;

export const FormInputTitle = styled.span`
  font-size: 1.1rem;
  font-weight: 500;
  color: rgb(125, 128, 135);
`;

export const FormInput = styled.input`
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

export const FormInputError = styled.span`
  text-align: left;
  margin-left: 10px;
  font-size: 13px;
  color: #ba1a1a;
`;

export const FormLinkContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  font-size: 1rem;
  font-weight: 500;

  a {
    color: ${({ theme }) => theme.primary.darkBlue};
    font-size: 1rem;
    font-weight: 500;
    text-decoration: none;
    transition: opacity 200ms ease-in-out;
    &:hover {
      opacity: 0.6;
    }
  }
`;
