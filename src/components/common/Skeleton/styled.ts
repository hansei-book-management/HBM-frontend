import styled from 'styled-components';

export const SkeletonContainer = styled.section`
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

export const SkeletonImageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SkeletonImageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const SkeletonImage = styled.div`
  width: 16rem;
  height: 24rem;
  background-color: ${({ theme }) => theme.skeleton};
  border: 1px solid ${({ theme }) => theme.imageBorder};
  @media screen and (max-width: 500px) and (min-width: 300px) {
    width: 12rem;
    height: 18rem;
  }
  @media screen and (max-width: 380px) and (min-width: 300px) {
    width: 9rem;
    height: 14rem;
  }
`;

export const SkeletonImageInfoContainer = styled.div`
  margin-top: 0.8rem;
  display: flex;
  flex-direction: column;
  row-gap: 0.4rem;
`;

export const SkeletonImageTitle = styled.span`
  text-decoration: none;
  background-color: ${({ theme }) => theme.skeleton};
  width: 70%;
  height: 1.2rem;
`;

export const SkeletonImageSubTitle = styled.span`
  background-color: ${({ theme }) => theme.skeleton};
  width: 50%;
  height: 1rem;
`;

export const SkeletonImageMessage = styled.span`
  margin-top: 0.6rem;
  background-color: ${({ theme }) => theme.skeleton};
  width: 20%;
  height: 1rem;
`;
