import React from 'react';

import * as S from './styled';

export interface FormCommonProps {
  children?: React.ReactNode;
}

type FormLinkContainerProps = FormCommonProps;

export const FormLinkContainer: React.FC<FormLinkContainerProps> = ({ children }) => {
  return <S.FormLinkContainer>{children}</S.FormLinkContainer>;
};

interface FormInputContainerProps extends FormCommonProps {
  inputTitle: string;
  errorMessage?: string;
}

export const FormInputContainer: React.FC<FormInputContainerProps> = ({
  children,
  inputTitle,
  errorMessage,
}) => {
  return (
    <S.FormInputContainer>
      <S.FormInputTitle>{inputTitle}</S.FormInputTitle>
      {children}
      <S.FormInputError>{errorMessage}</S.FormInputError>
    </S.FormInputContainer>
  );
};

interface FormComponentProps extends FormCommonProps {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  buttonChildren: React.ReactNode;
  phoneToken: boolean;
}

export const FormComponent: React.FC<FormComponentProps> = ({
  children,
  onSubmit,
  buttonChildren,
  phoneToken,
}) => {
  return (
    <S.FormContainer onSubmit={onSubmit}>
      <S.FormTitle>HANBOOK</S.FormTitle>
      {children}
      <S.FormButton phoneToken={phoneToken}>{buttonChildren}</S.FormButton>
    </S.FormContainer>
  );
};

export const Form = Object.assign(FormComponent, {
  InputContainer: FormInputContainer,
  LinkContainer: FormLinkContainer,
});
