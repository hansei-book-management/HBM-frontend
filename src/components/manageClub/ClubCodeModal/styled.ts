import styled from 'styled-components';

export const GenerateCodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  row-gap: 1.6rem;
`;

export const ModalTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
`;

export const GenerateCodeSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: 0.6rem;
`;

export const GenerateCodeTitle = styled.h3`
  font-size: 1rem;
  font-weight: 500;
`;

export const GenerateCodeSelect = styled.select`
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

export const InviteCodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  row-gap: 2rem;
`;

export const InviteCodeSubTitleContainer = styled.div`
  margin-top: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  font-size: 0.8rem;
  font-weight: 400;

  a {
    color: ${({ theme }) => theme.primary.darkBlue};
    font-size: 0.82rem;
    font-weight: 450;
    text-decoration: none;
    transition: opacity 200ms ease-in-out;
    &:hover {
      opacity: 0.6;
    }
  }
`;

export const InviteCodeValueContainer = styled.div`
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.46rem 1rem;
  padding-right: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.imageBorder};
  height: 2.6rem;
  border-radius: 2rem;
`;

export const InviteCodeText = styled.span`
  font-size: 1rem;
  font-weight: 400;
  color: #6f6f6f;
`;

export const InviteCodeCopyButtonWrapper = styled.div`
  border-radius: 50%;
  width: 3rem;
  height: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 150ms ease-in;
  cursor: pointer;
  &:active {
    background-color: #b3b3b3;
  }
  &:focus {
    background-color: #b3b3b3;
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
