import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { useRecoilState } from 'recoil';

import { CLUB_LIST } from '@/constant';
import { Modal, RentMessage, Section } from '@/components';
import { useModal } from '@/hooks/useModal';
import { StatusState } from '@/atoms';
import { Book1PNG } from '@/assets';

import * as S from './styled';

const teamLinkIsActive = (clubId?: string, id?: string) => clubId === id;

export const RentPage: React.FC = () => {
  const navigate = useNavigate();
  const { clubId } = useParams<{ clubId: string }>();
  const activeClub = CLUB_LIST.find(({ id }) => id === clubId);

  const { modalActive } = useModal();

  const isDetailPage = location.pathname.includes(`/rent/${clubId}/detail`);
  const isRentPage = location.pathname.includes(`/rent/${clubId}/book-rent`);

  const [status, setStatus] = useRecoilState(StatusState);

  const onNextNavigate = (id: number) => {
    navigate(`/rent/${clubId}/book-rent/${id}`);
  };

  const onRentNavigate = (id: number) => {
    navigate(`/rent/${clubId}/book-rent/${id}`);
    setStatus(true);
  };

  const onCloseNavigate = () => {
    navigate(`/rent/${clubId}`);
  };

  useEffect(() => {
    status && setStatus(false);
    if (!activeClub) {
      navigate(`/rent/${CLUB_LIST[0].id}`);
    } else if (!modalActive) {
      navigate(`/rent/${clubId}`);
    }
  }, [activeClub, modalActive]);

  return (
    <S.RentPageContainer>
      <S.TeamList>
        {CLUB_LIST.map(({ name, id }) => (
          <S.TeamLink to={`/rent/${id} `} isActive={teamLinkIsActive(clubId, id)}>
            {name}
          </S.TeamLink>
        ))}
      </S.TeamList>
      {activeClub && <S.RentPageTitle>{activeClub.name} 도서</S.RentPageTitle>}
      <Section activeClub={activeClub} />
      {(modalActive && isDetailPage && (
        <Modal.OverLay>
          <Modal
            textProps={
              <>
                <div style={{ display: 'flex' }}>
                  <S.ModalImage src={Book1PNG} />
                  <S.ModalInfoContainer>
                    <RentMessage canRent={true} />
                    <S.ModalTitle>세노이의 가르침</S.ModalTitle>
                    <S.ModalInfo>
                      세이노 저자(글)
                      <br />
                      데이원 · 2023년 03월 02일
                    </S.ModalInfo>
                    <S.ModalSubTitle>
                      머릿글: 초판 한정 블랙 에디션
                      <br />
                      재야의 명저 《세이노의 가르침》 2023년판 정식 출간!
                      <br />
                      순자산 천억 원대 자산가, 세이노의 ‘요즘 생각’을 만나다
                    </S.ModalSubTitle>
                  </S.ModalInfoContainer>
                </div>
                <S.ModalContentTitle>책 소개</S.ModalContentTitle>
                <S.ModalContent>
                  2000년부터 발표된 그의 주옥같은 글들. 독자들이 자발적으로 만든 제본서는 물론,
                  전자책과 앱까지 나왔던 《세이노의 가르침》이 드디어 전국 서점에서 독자들을
                  마주한다. 여러 판본을 모으고 저자의 확인을 거쳐 최근 생각을 추가로 수록하였다.
                  정식 출간본에만 추가로 수록된 글들은 목차와 본문에 별도 표시하였다.더 많은 사람이
                  이 책을 보고 힘을 얻길 바라기에 인세도 안 받는 저자의 마음을 담아, 700쪽이 넘는
                  분량에도 7천 원 안팎에 책을 구매할 수 있도록 했다. 정식 출간 전자책 또한 무료로
                  선보인다.*필명 ‘세이노(Say No)’는 당신이 믿고 있는 것들에 ‘No!’를 외치고 제대로
                  살아가라는 뜻이다. 세이노는 지난 20여 년간 여러 칼럼을 통해 인생 선배로서 부와
                  성공에 대한 지혜와 함께 삶에 대한 체험적 지식을 나누어 주었다. 그래서 그의 글을
                  좋아하는 사람들은 그를 ‘세이노 스승님’이라 부른다.
                </S.ModalContent>
              </>
            }
            leftButtonText="취소"
            rightButtonText="대여하기"
            onNavigate={() => onNextNavigate(1)}
            onCloseNavigate={() => onCloseNavigate()}
          />
        </Modal.OverLay>
      )) ||
        (modalActive && isRentPage && !status && (
          <Modal.OverLay>
            <Modal
              textProps={
                <>
                  <S.ModalTitle>대여 진행</S.ModalTitle>
                  <S.ModalSubTitle>
                    정말로 ‘당신이 모르는 민주주의’ 책을 대출할까요?
                    <br />
                    대출이 완료된 책은 동아리 부장의 확인을 받아야 반납처리할 수 있어요.
                  </S.ModalSubTitle>
                </>
              }
              leftButtonText="아니요"
              rightButtonText="네!"
              onNavigate={() => onRentNavigate(1)}
              onCloseNavigate={() => onCloseNavigate()}
            />
          </Modal.OverLay>
        )) ||
        (modalActive && isRentPage && status && (
          <Modal.OverLay>
            <Modal
              textProps={
                <>
                  <S.ModalSucessIcon />
                  <S.ModalTitle>대출 성공</S.ModalTitle>
                  <S.ModalLastContainer>
                    <S.ModalSubTitle>‘당신이 모르는 민주주의’ 책을 대출했어요.</S.ModalSubTitle>
                    <S.ModalSubTitle>
                      대출 기한은 10일이며, 연장 신청을 할 수 있어요.
                    </S.ModalSubTitle>
                    <S.ModalSubTitle>1차 반납 기간은 2023년 X월 X일까지에요.</S.ModalSubTitle>
                  </S.ModalLastContainer>
                </>
              }
              leftButtonText="확인했어요"
              rightButtonText="확인했어요"
              onCloseNavigate={() => onCloseNavigate()}
              lastPage={true}
            />
          </Modal.OverLay>
        ))}
    </S.RentPageContainer>
  );
};
