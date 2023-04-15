import { Link } from 'react-router-dom';
import { BiStopwatch } from 'react-icons/bi';

import styled, { css } from 'styled-components';

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
  border: 1px solid #eaeaea;
  @media screen and (max-width: 500px) and (min-width: 300px) {
    width: 12rem;
  }
  @media screen and (max-width: 380px) and (min-width: 300px) {
    width: 9rem;
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

export const ImageTitle = styled(Link)`
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

export const RentMessage = styled.span<{ canRent: boolean }>`
  margin-top: 0.6rem;
  font-size: 0.9rem;
  font-weight: 900;
  color: ${({ theme, canRent }) => (canRent ? theme.primary.green : theme.primary.red)};
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
