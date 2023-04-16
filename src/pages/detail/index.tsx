import { useParams } from 'react-router-dom';

import { Book1PNG } from '@/assets';
import { Button, RentMessage, Text } from '@/components';

import * as S from './styled';

export const DetailPage: React.FC = () => {
  return (
    <S.DetailContainer>
      <S.DetailSection>
        <S.DetailImage src={Book1PNG} />
        <S.DetailInfoContainer>
          <Text.Column style={{ rowGap: '0.4rem' }}>
            <RentMessage
              canRent={true}
              style={{ marginTop: 0, marginBottom: '.4rem', fontSize: '1rem', fontWeight: 650 }}
            />
            <Text size="medium">세이노의 가르침</Text>
            <Text size="small">세이노 저자(글)</Text>
            <S.DetailInfoText>데이원 · 2023년 03월 02일</S.DetailInfoText>
          </Text.Column>
          <S.BookReviewContainer>
            <S.IconContainer>
              <S.InfoText num={true}>8.2</S.InfoText>
              <div style={{ display: 'flex' }}>
                {[...Array(4)].map((_, i) => (
                  <S.ReviewIcon key={i} />
                ))}
              </div>
              <S.ReviewText>(3개의 리뷰)</S.ReviewText>
            </S.IconContainer>
            <S.BookReviewContainerLine />
            <S.IconContainer>
              <S.QuoteIcon />
              <S.InfoText num={false}>추천해요</S.InfoText>
              <S.ReviewText>(32%의 대여자)</S.ReviewText>
            </S.IconContainer>
          </S.BookReviewContainer>
          <div style={{ width: 'fit-content' }}>
            <Button to="/" description="대여하기" />
          </div>
        </S.DetailInfoContainer>
      </S.DetailSection>
    </S.DetailContainer>
  );
};
