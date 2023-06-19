import { APIResponse, API_SUFFIX, instance } from './api';

export interface ClubApplyFormValue {
  name: string;
}

export interface ClubMemberValues {
  cid?: number;
  user_id?: string;
}

export interface GenerateClubCodeValues {
  end: number;
  use: number;
  cid: number;
}

export interface CreateClubResponse {
  name: string;
  director: string;
}

export interface ClubMemberInfo {
  name: string;
  num: string;
  phone: string;
  role: string;
  uid: string;
  freeze?: number;
  borrowBook: number;
}

export interface GetClubResponse {
  cid: number;
  name: string;
  director: string;
  freeze?: number;
}

export interface GetClubMembers {
  name: string;
  director: string;
  cid: number;
  members: [ClubMemberInfo];
}

export interface GetClubMemberResponse extends ClubMemberInfo {
  books: [
    {
      title?: string;
      data?: string;
    },
  ];
}

export interface AddClubFormValues {
  clubCode: string;
}

export interface AddClubResponse {
  name: string;
  cid: number;
}

export interface UpdateClubMemberValues extends ClubMemberValues {
  freeze: number;
}

export interface ExpelClubMemberValues {
  cid?: number;
  user_id?: string;
}

export interface ChangeClubDirectorValues {
  cid?: number;
  name: string;
  director: string;
}

export const createClub = async ({ name }: ClubApplyFormValue) => {
  const { data } = await instance.post(API_SUFFIX.CLUB, {
    name,
  });
  return data;
};

export const getUserClub = async () => {
  const { data } = await instance.get(API_SUFFIX.CLUB);
  return data;
};

export const getClubInfo = async (cid?: number): Promise<APIResponse<GetClubMembers>> => {
  if (cid) {
    const { data } = await instance.get(`${API_SUFFIX.CLUB}/${cid}`);
    return data;
  } else {
    throw new Error('cid is undefined');
  }
};

export const generateClubCode = async ({
  end,
  use,
  cid,
}: GenerateClubCodeValues): Promise<APIResponse<{ token: string }>> => {
  const { data } = await instance.post(`${API_SUFFIX.CLUB}/${cid}/member`, {
    end,
    use,
  });
  return data;
};

export const addUserClub = async ({ clubCode }: AddClubFormValues) => {
  const { data } = await instance.post(`${API_SUFFIX.CLUB}/member`, {
    token: clubCode,
  });
  return data;
};

export const getClubMember = async ({
  cid,
  user_id,
}: ClubMemberValues): Promise<APIResponse<GetClubMemberResponse>> => {
  if (cid && user_id) {
    const { data } = await instance.get(`${API_SUFFIX.CLUB}/${cid}/member/${user_id}`);
    return data;
  } else {
    throw new Error('cid or user_id is undefined');
  }
};
export const deleteClub = async (cid?: number) => {
  if (cid) {
    const { data } = await instance.delete(`${API_SUFFIX.CLUB}/${cid}`);
    console.log('delete');
    return data;
  } else {
    throw new Error('cid is undefined');
  }
};

export const changeClubDirector = async ({
  cid,
  name,
  director,
}: ChangeClubDirectorValues): Promise<APIResponse<ChangeClubDirectorValues>> => {
  if (cid) {
    const { data } = await instance.put(`${API_SUFFIX.CLUB}/${cid}`, {
      name,
      director,
    });
    return data;
  } else {
    throw new Error('cid is undefined');
  }
};

export const updateClubMember = async ({
  cid,
  user_id,
  freeze,
}: UpdateClubMemberValues): Promise<APIResponse<GetClubMemberResponse>> => {
  if (cid && user_id) {
    const { data } = await instance.patch(`${API_SUFFIX.CLUB}/${cid}/member/${user_id}`, {
      freeze,
    });
    return data;
  } else {
    throw new Error('cid or user_id is undefined');
  }
};

export const expelClubMember = async ({ cid, user_id }: ExpelClubMemberValues) => {
  if (cid && user_id) {
    const { data } = await instance.delete(`${API_SUFFIX.CLUB}/${cid}/member/${user_id}`);
    return data;
  } else {
    throw new Error('cid or user_id is undefined');
  }
};
