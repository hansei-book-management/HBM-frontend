import { Link } from 'react-router-dom';
import { BiStopwatch } from 'react-icons/bi';

import styled from 'styled-components';

export const SectionContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: flex-start;
  row-gap: 8rem;
  margin-bottom: 3.6rem;
  @media screen and (max-width: 1000px) and (min-width: 700px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 700px) and (min-width: 300px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const Image = styled.img`
  width: 16rem;
  transition: scale 0.15s;
  border: 1px solid ${({ theme }) => theme.imageBorder};
  @media screen and (max-width: 500px) and (min-width: 300px) {
    width: 12rem;
  }
  @media screen and (max-width: 380px) and (min-width: 300px) {
    width: 9rem;
  }
  :hover {
    scale: 1.03;
    transition-duration: 0.15;
  }
`;

export const ImageMangeInfo = styled.div<{ timeOver: boolean }>`
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px;
  background-color: ${({ timeOver, theme }) => (timeOver ? theme.time.danger : theme.time.safe)};
  opacity: 0.6;
  backdrop-filter: blur(14px);
  z-index: 99;
  column-gap: 4px;
  width: 16rem;
  @media screen and (max-width: 500px) and (min-width: 380px) {
    width: 12rem;
  }
  @media screen and (max-width: 380px) and (min-width: 300px) {
    width: 9rem;
  }
`;

export const ImageMangeInfoText = styled.span`
  font-size: 0.8rem;
  font-weight: 400;
  color: ${({ theme }) => theme.primary.white};
  z-index: 99;
`;

export const ImageMangeIcon = styled(BiStopwatch)`
  width: 20px;
  color: ${({ theme }) => theme.white};
  z-index: 99;
`;

export const TitleContainer = styled.div`
  margin-top: 0.8rem;
  display: flex;
  flex-direction: column;
  row-gap: 0.4rem;
`;

export const ImageTitle = styled.span`
  text-decoration: none;
  color: ${({ theme }) => theme.black};
  font-size: 1rem;
  font-weight: 600;
  &:hover {
    text-decoration: underline;
  }
`;

export const ImageSubTitle = styled.span`
  font-size: 0.8rem;
  font-weight: 400;
  color: ${({ theme }) => theme.black};
`;

export const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 1rem;
  padding: 4rem 0;
`;

export const PaginationButton = styled.button<{ show: boolean }>`
  cursor: pointer;
  align-self: center;
  justify-self: center;
  font-size: 1.4rem;
  font-weight: 700;
  border: none;
  padding-bottom: 6px;
  background-color: transparent;
  opacity: ${({ show }) => (show ? 1 : 0)};
`;

export const PaginationText = styled.span`
  font-size: 1.2rem;
  font-weight: 400;
  color: ${({ theme }) => theme.black};
`;

export const ModalTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 1.1rem;
`;

export const ModalSubTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 2.4rem;
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
