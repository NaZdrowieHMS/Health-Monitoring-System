import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  HealthCommentUpload,
  DoctorComment,
  UserData,
  ResultCommentUpload,
} from "properties/types";
import { CommentsFilter, doctorDataPagination } from "./utils";
import { axiosApi } from "./axios";
import { PaginationData } from "properties/types/api";
import { doctorKeys, patientKeys } from "./utils";

export const useFetchResultCommentsData = <T = DoctorComment[]>(
  user: UserData,
  resultId: number,
  select?: (data: DoctorComment[]) => T,
  pagination?: PaginationData,
  patientId?: number
) => {
  return useQuery<DoctorComment[], Error, T>({
    queryKey: patientId
      ? doctorKeys.patient.results.specificComments(
          user.id,
          patientId,
          resultId,
          pagination
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
  filter?: CommentsFilter
) => {
  return useQuery<DoctorComment[], Error, T>({
    queryKey: patientId
      ? doctorKeys.patient.healthComments.list(
          user.id,
          patientId,
          pagination,
          filter
        )
      : patientKeys.healthComments.list(user.id, pagination, filter),
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

export const useSendHealthComment = (user: UserData) => {
  const queryClient = useQueryClient();

  let patientId: number = null;

  return useMutation({
    mutationFn: async (comment: HealthCommentUpload) => {
      patientId = comment.patientId;
      const { data } = await axiosApi.post("health", comment);
      return data;
    },
    onSuccess(newComments: DoctorComment) {
      // currently updated - currentDoctorComments, all patient's health comments (if fetched before)
      try {
        queryClient.setQueryData(
          doctorKeys.patient.healthComments.list(
            user.id,
            patientId,
            doctorDataPagination.currentDotorComments,
            CommentsFilter.Specific
          ),
          (oldComments: DoctorComment[]) => {
            if (oldComments !== undefined) {
              return [newComments, ...oldComments.slice(0, -1)];
            }
          }
        );
        queryClient.setQueryData(
          doctorKeys.patient.healthComments.list(user.id, patientId),
          (oldComments: DoctorComment[]) => {
            if (oldComments !== undefined) {
              return [newComments, ...oldComments];
            }
            return oldComments;
          }
        );
      } catch (error) {
        console.error(error);
      }
    },
  });
};

export const useSendResultComment = (user: UserData, patientId: number) => {
  const queryClient = useQueryClient();
  let resultId: number = null;
  return useMutation({
    mutationFn: async (comment: ResultCommentUpload) => {
      resultId = comment.resultId;
      const { data } = await axiosApi.post("results/comments", comment);
      return data;
    },
    onSuccess(newComment: DoctorComment) {
      // updated - result's displayed comment, all fethed comments (if fetched before)
      queryClient.setQueryData(
        doctorKeys.patient.results.specificComments(
          user.id,
          patientId,
          resultId,
          doctorDataPagination.resultComments
        ),
        (oldComments: DoctorComment[]) => {
          if (oldComments !== undefined) {
            return [newComment, ...oldComments.slice(0, -1)];
          }
        }
      );
      queryClient.setQueryData(
        doctorKeys.patient.results.specificComments(
          user.id,
          patientId,
          resultId
        ),
        (oldComments: DoctorComment[]) => {
          if (oldComments !== undefined) {
            return [newComment, ...oldComments];
          }
        }
      );
    },
  });
};
