import { UseMutationResult, UseQueryResult, useMutation, useQuery } from 'react-query';

import { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';

import {
  APIErrorResponse,
  APIResponse,
  APIResponseStatusType,
  ClubMemberValues,
  ExpelClubMemberValues,
  GetClubMemberResponse,
  UpdateClubMemberValues,
  expelClubMember,
  getClubMember,
  updateClubMember,
} from '@/api';
import { expelClubMemberModal, updateClubMemberModal } from '@/atoms';

export const useGetClubMember = ({
  cid,
  user_id,
}: ClubMemberValues): UseQueryResult<
  APIResponse<GetClubMemberResponse>,
  AxiosError<APIErrorResponse>
> =>
  useQuery('useGetMember', () => getClubMember({ cid, user_id }), {
    retry: 0,
    staleTime: 36000,
  });

export const useUpdateClubMember = ({
  cid,
  user_id,
  freeze,
}: UpdateClubMemberValues): UseMutationResult<
  APIResponse<{ freeze?: number }>,
  AxiosError<APIErrorResponse>
> => {
  const setUpdateUserModal = useSetRecoilState(updateClubMemberModal);
  return useMutation('useUpdateClubMember', () => updateClubMember({ cid, user_id, freeze }), {
    onSuccess: (data: {
      status: APIResponseStatusType;
      message: string;
      result: { freeze?: number };
    }) => {
      setUpdateUserModal((prev) => ({ ...prev, isLoading: true }));
      setTimeout(() => {
        setUpdateUserModal({ state: true, isOk: true, data: data.result.freeze });
      }, 500);
    },
    onError: (data) => {
      setUpdateUserModal({ state: true, isOk: false, data: data.response?.data.message });
    },
    retry: 0,
  });
};

export const useExpelClubMember = ({
  cid,
  user_id,
}: ExpelClubMemberValues): UseMutationResult<APIResponse<null>, AxiosError<APIErrorResponse>> => {
  const setExpelMemberModal = useSetRecoilState(expelClubMemberModal);
  return useMutation('useExpelClubMember', () => expelClubMember({ cid, user_id }), {
    onSuccess: () => {
      setExpelMemberModal((prev) => ({ ...prev, isLoading: true }));
      setTimeout(() => {
        setExpelMemberModal({ state: true, isOk: true });
      }, 500);
    },
    onError: (data) => {
      setExpelMemberModal({ state: true, isOk: false, data: data.response?.data.message });
    },
    retry: 0,
  });
};
