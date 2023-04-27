import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

import { Section } from '@/components';
import { USER_CLUB_LIST } from '@/constant';

import * as S from './styled';

export const ManageUserBookPage: React.FC = () => {
  const userClubIsActive = (userClubId?: string, id?: string) => userClubId === id;
  const navigate = useNavigate();

  const { userClubId } = useParams<{ userClubId: string }>();
  const activeUserClub = USER_CLUB_LIST.find(({ id }) => id === userClubId);

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
        <S.ClubAddIconWrap>
          <FaPlus size={'0.9rem'} />
        </S.ClubAddIconWrap>
      </S.UserClubList>
      <Section activeClub={activeUserClub} />
    </S.ManageUserBookPageContainer>
  );
};
