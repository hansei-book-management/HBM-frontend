import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { BiStopwatch } from 'react-icons/bi';

import styled, { css } from 'styled-components';

export const SectionContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: flex-start;
  row-gap: 8rem;
  margin-bottom: 3.6rem;
`;

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 215px;
`;

export const Image = styled.img`
  width: 215px;
  border: 1px solid #eaeaea;
`;

export const ImageMangeInfo = styled.div<{ timeOver: boolean }>`
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 6px;
  background-color: ${({ timeOver, theme }) => (timeOver ? theme.time.danger : theme.time.safe)};
  opacity: 0.6;
  backdrop-filter: blur(14px);
  z-index: 99;
  column-gap: 4px;
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
  color: ${({ theme }) => theme.primary.black};
`;

export const RentMessage = styled.span<{ canRent: boolean }>`
  margin-top: 0.6rem;
  font-size: 0.9rem;
  font-weight: 900;
  color: ${({ theme, canRent }) => (canRent ? theme.primary.green : theme.primary.red)};
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 1rem;
  padding-bottom: 4rem;
  align-items: center;
`;

export const PaginationItem = styled.span<{ isSelected: boolean }>`
  cursor: pointer;
  align-self: center;
  justify-self: center;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 50%;
  letter-spacing: -0.01em;
  padding: 6px 10px;
  transition: background 150ms;
  ${(props) =>
    props.isSelected
      ? css`
          color: ${props.theme.primary.white};
          background-color: ${props.theme.primary.black};
        `
      : css`
          color: ${props.theme.primary.black};
          background-color: ${props.theme.primary.white};
        `}
`;

export const PaginationIconLeft = styled(FaChevronLeft)`
  border-radius: 50%;
  padding: 4px;
  align-self: center;
  justify-self: center;
  color: ${({ theme }) => theme.primary.black};
  border: 0.5px solid ${({ theme }) => theme.primary.black};
`;

export const PaginationIconRight = styled(FaChevronRight)`
  border-radius: 50%;
  padding: 4px;
  align-self: center;
  justify-self: center;
  color: ${({ theme }) => theme.primary.black};
  border: 0.5px solid #171717;
`;
