import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import styled, { css } from 'styled-components';

export const SectionContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: flex-start;
  row-gap: 8rem;
  margin-bottom: 3.6rem;
`;

export const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Image = styled.img`
  width: 215px;
  border: 1px solid #eaeaea;
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
  padding: 0.3rem;
  align-self: center;
  justify-self: center;
  color: ${({ theme }) => theme.primary.black};
  border: 0.5px solid ${({ theme }) => theme.primary.black};
`;

export const PaginationIconRight = styled(FaChevronRight)`
  border-radius: 50%;
  padding: 0.3rem;
  align-self: center;
  justify-self: center;
  color: ${({ theme }) => theme.primary.black};
  border: 0.5px solid #171717;
`;
