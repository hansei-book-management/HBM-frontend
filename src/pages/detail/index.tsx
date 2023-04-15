import { useParams } from 'react-router-dom';

import { Book1PNG } from '@/assets';
import { RentMessage, Text } from '@/components';

import * as S from './styled';

export const DetailPage: React.FC = () => {
  const { bookId } = useParams();

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
        </S.DetailInfoContainer>
      </S.DetailSection>
    </S.DetailContainer>
  );
};
