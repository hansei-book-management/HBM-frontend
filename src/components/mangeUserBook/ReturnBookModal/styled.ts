import styled from 'styled-components';

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  row-gap: 2rem;
  width: 100%;
`;

export const ModalTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
`;

export const ReturnBookModalContainer = styled.div`
  padding: 0 0;
  align-self: center;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

export const ReturnModalIconContainer = styled.label<{ imageUrl: string | null }>`
  width: 25rem;
  height: 14rem;
  border-radius: 2rem;
  background-color: #dddddd;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 0.4rem;
  cursor: default;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const ReturnBookModalPhotoInput = styled.input`
  margin-top: 0.4rem;
  width: 100%;
  display: none;
`;

export const ReturnModalIconTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: 600;
  color: #999999;
`;

export const ReturnBookModalTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 700;
  color: #828282;
`;

export const ReturnBookModalTitleBlack = styled(ReturnBookModalTitle)`
  margin-top: 1rem;
  color: black;
`;

export const ReturnBookModalMessage = styled.span`
  font-size: 0.85rem;
  font-weight: 550;
  line-height: 1.2rem;
  color: #828282;
  text-align: center;
  margin-bottom: 0.4rem;
`;

export const ReturnBookModalMessageBlack = styled(ReturnBookModalMessage)`
  color: black;
`;

export const StatusModalText = styled.h3`
  font-size: 1.1rem;
  font-weight: 550;
  line-height: 1.8rem;
  justify-self: center;
  align-self: center;
  text-align: center;
`;
