import { Link } from 'react-router-dom';
import { HiCheckCircle } from 'react-icons/hi';

import styled, { css, keyframes } from 'styled-components';

export const modalIconShowKeyframes = keyframes`
    0% {
        opacity: 0;
        transform: scale(0.5);
    }

    100% {
        opacity: 1;
        transform: scale(1);
    }
`;

export const modalChanagePageKeyframes = keyframes`
    0% {
        opacity: 0;
        transform: opacity(0.2);
    }

    100% {
        opacity: 1;
        transform: opacity(1);
    }
`;

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
  row-gap: 0.5rem;
  margin-left: 40px;
`;

export const ModalSubTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 550;
  line-height: 1.8rem;
`;

export const ModalInfo = styled.p`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.6rem;
  margin: 1rem 0;
`;

export const ModalContentTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 550;
  margin-top: 1rem;
`;

export const ModalContent = styled.p`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.6rem;
`;

export const ModalSuccessIcon = styled(HiCheckCircle)`
  width: 4rem;
  height: 4rem;
  color: ${({ theme }) => theme.primary.blue};
  background-color: ${({ theme }) => theme.primary.white};
  animation: 200ms cubic-bezier(0.33, 1, 0.68, 1) ${modalIconShowKeyframes};
`;

export const ModalLastContainer = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  > * {
    line-height: 2rem;
  }
`;

export const ModalContentContainer = styled.div<{ lastPage: boolean }>`
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  gap: 1.4rem;
  animation: 600ms cubic-bezier(0.33, 1, 0.68, 1) ${modalChanagePageKeyframes};
  ${({ lastPage }) =>
    lastPage &&
    css`
      align-items: center;
      justify-content: center;
      padding-bottom: 1.5rem;
    `};
`;
