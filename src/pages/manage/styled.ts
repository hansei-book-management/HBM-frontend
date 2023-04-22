import styled from 'styled-components';

export const ManagePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

export const ManageMessage = styled.span`
  width: 100%;
  padding: 1.4rem;
  border-radius: 0.4rem;
  font-size: 1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.primary.black};
  background-color: #ffcfcf;
  text-align: left;
  margin-bottom: 2rem;
`;

export const ManagePageSubTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.black};
`;

export const ManagePageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
`;
