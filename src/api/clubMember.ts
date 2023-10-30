import { APIResponse, API_SUFFIX, instance } from './api';
import { BookListProps, BookResponse } from './book';

export interface UpdateClubMemberValues extends ClubMemberValues {
  freeze: number;
}

export interface ClubMemberValues {
  cid?: number;
  user_id?: string;
}

export interface ClubMemberInfo {
  name: string;
  num: string;
  phone: string;
  role: string;
  uid: string;
  freeze?: number;
  borrowBook: number;
  book?: [BookListProps];
}

export interface GetClubMemberResponse extends ClubMemberInfo {
  books: {
    name: string;
    book: [
      {
        data?: {
          items: BookResponse[];
        };
        end: number;
      },
    ];
  };
}

export type ExpelClubMemberValues = ClubMemberValues;

export const getClubMember = async ({
  cid,
  user_id,
}: ClubMemberValues): Promise<APIResponse<GetClubMemberResponse>> => {
  const { data } = await instance.get(`${API_SUFFIX.CLUB}/${cid}/member/${user_id}`);
  return data;
};

export const updateClubMember = async ({ cid, user_id, freeze }: UpdateClubMemberValues) => {
  if (cid && user_id) {
    const { data } = await instance.patch(`${API_SUFFIX.CLUB}/${cid}/member/${user_id}`, {
      freeze,
    });
    return data;
  }
};

export const expelClubMember = async ({ cid, user_id }: ExpelClubMemberValues) => {
  if (cid && user_id) {
    const { data } = await instance.delete(`${API_SUFFIX.CLUB}/${cid}/member/${user_id}`);
    return data;
  }
};
