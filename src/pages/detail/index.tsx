import { Book1PNG } from '@/assets';
import { Button, RentMessage, Text } from '@/components';

import * as S from './styled';

export const DetailPage: React.FC = () => {
  return (
    <S.DetailContainer>
      <S.DetailSection textSection={false}>
        <S.DetailImage src={Book1PNG} />
        <S.DetailInfoContainer>
          <div>
            <Text.Column style={{ rowGap: '0.4rem', height: 'fit-content' }}>
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
          </div>
          <div style={{ width: 'fit-content' }}>
            <Button to="/" description="대여하기" />
          </div>
        </S.DetailInfoContainer>
      </S.DetailSection>
      <S.DetailSection textSection={true}>
        <S.DetailBookIntro>
          <S.DetailBookIntroTitle size="large">책 소개</S.DetailBookIntroTitle>
          <S.DetailBookIntroTitle size="medium">이 책이 속한 분야</S.DetailBookIntroTitle>
          <S.DetailBookIntroTitle size="small">
            {'국내도서 > 자기계발 > 성공/처세 > 자기관리/처세'}
          </S.DetailBookIntroTitle>
        </S.DetailBookIntro>
        <S.DetailBookIntroBottom>
          <S.DetailBookIntroBottomTitle>
            ㆍ 머릿글: 초판 한정 블랙 에디션
            <br />
            <br />
            재야의 명저 《세이노의 가르침》 2023년판 정식 출간!
            <br />
            순자산 천억 원대 자산가, 세이노의 ‘요즘 생각’을 만나다
          </S.DetailBookIntroBottomTitle>
          <S.DetailBookIntroBottomText>
            2000년부터 발표된 그의 주옥같은 글들. 독자들이 자발적으로 만든 제본서는 물론, 전자책과
            앱까지 나왔던 《세이노의 가르침》이 드디어 전국 서점에서 독자들을 마주한다. 여러 판본을
            모으고 저자의 확인을 거쳐 최근 생각을 추가로 수록하였다. 정식 출간본에만 추가로 수록된
            글들은 목차와 본문에 별도 표시하였다.
            <br />
            <br />
            더 많은 사람이 이 책을 보고 힘을 얻길 바라기에 인세도 안 받는 저자의 마음을 담아,
            700쪽이 넘는 분량에도 7천 원 안팎에 책을 구매할 수 있도록 했다. 정식 출간 전자책 또한
            무료로 선보인다.
            <br />
            <br />
            *필명 ‘세이노(Say No)’는 당신이 믿고 있는 것들에 ‘No!’를 외치고 제대로 살아가라는
            뜻이다. 세이노는 지난 20여 년간 여러 칼럼을 통해 인생 선배로서 부와 성공에 대한 지혜와
            함께 삶에 대한 체험적 지식을 나누어 주었다. 그래서 그의 글을 좋아하는 사람들은 그를
            ‘세이노 스승님’이라 부른다.
          </S.DetailBookIntroBottomText>
        </S.DetailBookIntroBottom>
      </S.DetailSection>
    </S.DetailContainer>
  );
};
