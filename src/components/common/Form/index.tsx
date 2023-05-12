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
  return (
    <S.FormWrapper>
      <S.FormContainer onSubmit={onSubmit}>
        <S.FormTitle>HANBOOK</S.FormTitle>
        {children}
      </S.FormContainer>
    </S.FormWrapper>
  );
};

export const Form = Object.assign(FormComponent, {
  Button: FormButton,
  InputContainer: FormInputContainer,
  LinkContainer: FormLinkContainer,
});
