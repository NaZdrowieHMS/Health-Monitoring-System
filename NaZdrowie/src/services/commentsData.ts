import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  HealthCommentUpload,
  DoctorComment,
  UserData,
  ResultCommentUpload,
} from "properties/types";
import { CommentsFilter } from "./utils";
import { axiosApi } from "./axios";
import { PaginationData } from "properties/types/api";
import { doctorKeys, patientKeys } from "./queryKeyFactory";

export const useFetchResultCommentsData = <T = DoctorComment[]>(
  user: UserData,
  resultId: number,
  select?: (data: DoctorComment[]) => T,
  pagination?: PaginationData,
  patientId?: number,
) => {
  return useQuery<DoctorComment[], Error, T>({
    queryKey: patientId
      ? doctorKeys.patient.results.specificComments(
          user.id,
          patientId,
          resultId,
          pagination,
        )
      : patientKeys.results.specificComments(user.id, resultId, pagination),
    queryFn: async () => {
      const { data } = await axiosApi.get(`results/${resultId}/comments`, {
        params: {
          ...pagination,
        },
      });
      return data;
    },
    select,
  });
};

export const useFetchHealthComments = <T = DoctorComment[]>(
  user: UserData,
  select?: (data: DoctorComment[]) => T,
  pagination?: PaginationData,
  patientId?: number,
  filter?: CommentsFilter,
) => {
  return useQuery<DoctorComment[], Error, T>({
    queryKey: patientId
      ? doctorKeys.patient.healthComments.list(user.id, patientId, pagination)
      : patientKeys.healthComments.list(user.id, pagination),
    queryFn: async () => {
      const { data } = await axiosApi.get("health", {
        params: {
          ...pagination,
          patientId,
          filter,
        },
      });
      return data;
    },
    select,
  });
};

// TODO
export const useSendHealthComment = (user: UserData) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (comment: HealthCommentUpload) => {
      const { data } = await axiosApi.post("health", comment);
      return data;
    },
    onSuccess(data: DoctorComment) {
      queryClient.invalidateQueries({
        queryKey: [user, "healthComments"],
      });
    },
  });
};

// TODO
export const useSendResultComment = (user: UserData) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (comment: ResultCommentUpload) => {
      const { data } = await axiosApi.post("results/comments", comment);
      return data;
    },
    onSuccess(data: DoctorComment) {
      queryClient.invalidateQueries({
        queryKey: [user, "resultComments"],
      });
    },
  });
};
