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

type FormTitleProps = FormCommonProps;

export const FormTitle: React.FC<FormTitleProps> = ({ children }) => {
  return <S.FormTitle>{children}</S.FormTitle>;
};

interface FormButtonProps extends FormCommonProps {
  phoneToken: boolean;
}

export const FormButton: React.FC<FormButtonProps> = ({ children, phoneToken }) => {
  return <S.FormButton phoneToken={phoneToken}>{children}</S.FormButton>;
};

interface FormComponentProps extends FormCommonProps {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const FormComponent: React.FC<FormComponentProps> = ({ children, onSubmit }) => {
  return <S.FormContainer onSubmit={onSubmit}>{children}</S.FormContainer>;
};

export const Form = Object.assign(FormComponent, {
  Button: FormButton,
  Title: FormTitle,
  InputContainer: FormInputContainer,
  LinkContainer: FormLinkContainer,
});
