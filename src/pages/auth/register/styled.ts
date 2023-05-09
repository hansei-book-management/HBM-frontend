import styled, { css } from 'styled-components';

import { colors } from '@/styles';

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
  width: 34rem;
`;

export const RegisterTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
`;

export const RegisterInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.6rem;
`;

export const RegisterInputTitle = styled.span`
  font-size: 1.1rem;
  font-weight: 500;
  color: rgb(125, 128, 135);
`;

export const RegisterInput = styled.input`
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

export const RegisterButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const RegisterButtonLine = styled.span`
  width: 2px;
  height: 100%;
  background-color: ${({ theme }) => theme.imageBorder};
`;

export const RegisterButton = styled.button<{ phoneToken: boolean }>`
  background-color: #56599f;
  border: none;
  padding: 14px 0;
  border-radius: 0.8rem;
  align-self: center;
  height: 3rem;
  width: 100%;
  color: ${({ theme }) => theme.white};
  font-size: 1.2rem;
  font-weight: 600;
  ${({ phoneToken }) =>
    phoneToken
      ? css`
          opacity: 1;
          transition: opacity 150ms ease-in-out;
          &:hover {
            opacity: 0.8;
          }
        `
      : css`
          opacity: 0.5;
        `}
`;

export const RegisterErrorMessage = styled.p`
  text-align: left;
  margin-left: 10px;
  font-size: 13px;
  color: #ba1a1a;
`;

export const RegisterPhoneInputContainer = styled.div`
  display: flex;
  column-gap: 0.6rem;
`;

export const RegisterPhoneRequestButton = styled.button`
  border: none;
  height: 100%;
  width: 7rem;
  align-self: center;
  text-align: center;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 0.6rem;
  color: ${colors.white};
  background-color: ${({ theme }) => theme.primary.darkBlue};
  transition: opacity 150ms ease-in-out;
  &:hover {
    opacity: 0.8;
  }
`;
