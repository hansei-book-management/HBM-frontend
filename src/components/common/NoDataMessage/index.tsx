import React from 'react';

import { Button } from '../Button';

import * as S from './styled';

export interface NoDataMessageProps {
  message: string;
  btnLink?: string;
  btnMessage?: string;
  children?: React.ReactNode;
  showBtn?: boolean;
  onClick?: () => void;
}

export const NoDataMessage: React.FC<NoDataMessageProps> = ({
  message,
  btnLink,
  btnMessage,
  children,
  showBtn = true,
  onClick,
}) => {
  return (
    <S.NoDataMessageWrapper>
      {children}
      <S.NoDataMessageContainer>
        <S.NoDataMessage>
          {message.split('\n').map((line) => {
            return (
              <>
                {line}
                <br />
              </>
            );
          })}
        </S.NoDataMessage>
        {showBtn && <Button to={btnLink || ''} description={btnMessage || ''} onClick={onClick} />}
      </S.NoDataMessageContainer>
    </S.NoDataMessageWrapper>
  );
};
