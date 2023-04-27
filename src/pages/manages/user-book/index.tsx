import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

import { Modal, Section } from '@/components';
import { USER_CLUB_LIST } from '@/constant';
import { useModal } from '@/hooks';

import * as S from './styled';

export const ManageUserBookPage: React.FC = () => {
  const navigate = useNavigate();
  const { modalActive, open } = useModal();

  const { userClubId } = useParams<{ userClubId: string }>();
  const activeUserClub = USER_CLUB_LIST.find(({ id }) => id === userClubId);

  const userClubIsActive = (userClubId?: string, id?: string) => userClubId === id;

  const onClick = () => {
    navigate(`/manage/user-book/${userClubId}?club-add`);
    open();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!activeUserClub) {
      navigate(`/manage/user-book/${USER_CLUB_LIST[0].id}`);
    }
  }, [activeUserClub]);

  return (
    <S.ManageUserBookPageContainer>
      {/* <S.ManageMessage>
        현재 3일 1시간 연체중이에요. 도서 대여가 정지될 수도 있으니 빨리 반납해 주세요.
      </S.ManageMessage> */}
      <S.ManageUserBookPageSubTitle>
        앙기모링님은 현재 2권 대출중이에요.
      </S.ManageUserBookPageSubTitle>
      <S.ManageUserBookPageTitle>대출 중인 {activeUserClub?.name} 도서</S.ManageUserBookPageTitle>
      <S.UserClubList>
        {USER_CLUB_LIST.map(({ name, id }) => (
          <S.UserClubLink
            key={id}
            to={`/manage/user-book/${id}`}
            isActive={userClubIsActive(userClubId, id)}
          >
            {name}
          </S.UserClubLink>
        ))}
        <S.ClubAddIconWrap onClick={onClick}>
          <FaPlus size={'0.9rem'} />
        </S.ClubAddIconWrap>
      </S.UserClubList>
      <Section activeClub={activeUserClub} />
      {modalActive && (
        <Modal.OverLay>
          <Modal
            textProps={
              <S.ModalAddClubContainer>
                <S.ModalAddClubSelect>
                  <option value="0" selected={true} disabled={true}>
                    동아리를 선택해주세요...
                  </option>
                  <option value="1">hsoc</option>
                  <option value="2">ssr</option>
                  <option value="3">nsb</option>
                </S.ModalAddClubSelect>
                <S.ModalAddClubInputContainer>
                  <S.ModalAddClubInputText>인증키 입력</S.ModalAddClubInputText>
                  <S.ModalAddClubInput />
                </S.ModalAddClubInputContainer>
              </S.ModalAddClubContainer>
            }
            leftButtonText="취소"
            rightButtonText="추가하기"
            lastPage={true}
            clubAddModal={true}
          />
        </Modal.OverLay>
      )}
    </S.ManageUserBookPageContainer>
  );
};
