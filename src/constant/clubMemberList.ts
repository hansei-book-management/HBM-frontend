export interface ClubMemberListProps {
  member: string;
}

export interface ClubMemberProps {
  title: string;
  memberList: ClubMemberListProps[];
}

export const CLUB_MEMBER_LIST: ClubMemberProps[] = [
  {
    title: '현재 부장',
    memberList: [
      {
        member: '최근원',
      },
    ],
  },
  {
    title: '변경할 부장',
    memberList: [
      {
        member: '신주호',
      },
      {
        member: '김태훈',
      },
      {
        member: '김도훈',
      },
      {
        member: '박여준',
      },
      {
        member: '배정혜',
      },
      {
        member: '김도균',
      },
    ],
  },
];
