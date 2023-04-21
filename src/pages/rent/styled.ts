import { Link } from 'react-router-dom';

import styled, { css } from 'styled-components';

export const RentPageContainer = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  row-gap: 3rem;
`;

export const TeamList = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  column-gap: 2rem;
  margin-bottom: 0.8rem;
`;

export const TeamLink = styled(Link)<{ isActive: boolean }>`
  padding: 0.75rem 1rem;
  border-radius: 1.2rem;
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 500;
  transition: background 150ms;
  ${(props) =>
    props.isActive
      ? css`
          color: ${props.theme.primary.white};
          background-color: ${props.theme.black};
        `
      : css`
          color: ${props.theme.black};
          background-color: ${props.theme.primary.white};
        `}
`;

export const RentPageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
`;

export const ModalTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 1.1rem;
`;

export const ModalImage = styled.img`
  width: 16rem;
  border: 1px solid ${({ theme }) => theme.imageBorder};
`;

export const ModalInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1.6rem;
  padding-bottom: 2rem;
  margin-left: 40px;
`;

export const ModalSubTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.6rem;
`;

export const ModalInfo = styled.p`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.6rem;
`;

export const ModalContent = styled.p`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.3rem;
`;
