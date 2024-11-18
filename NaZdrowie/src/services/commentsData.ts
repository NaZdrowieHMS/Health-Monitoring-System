import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  HealthCommentUpload,
  DoctorComment,
  UserData,
  ResultCommentUpload,
} from "properties/types";
import { CommentsFilter } from "./utils";
import { axiosApi } from "./axios";

export const useFetchResultCommentsData = <T = DoctorComment[]>(
  user: UserData,
  resultId: number,
  select?: (data: DoctorComment[]) => T,
  numberOfComments?: number,
) => {
  const commentsCount = numberOfComments
    ? `?startIndex=0&pageSize=${numberOfComments}`
    : "";

  return useQuery<DoctorComment[], Error, T>({
    queryKey: [
      user,
      "resultComments",
      `results/${resultId}/comments${commentsCount}`,
    ],

    select,
  });
};

export const useFetchHealthComments = <T = DoctorComment[]>(
  user: UserData,
  select?: (data: DoctorComment[]) => T,
  patientId?: number,
  numberOfComments?: number,
) => {
  const commentsCount = numberOfComments
    ? `?startIndex=0&pageSize=${numberOfComments}`
    : "";

  return useQuery<DoctorComment[], Error, T>({
    queryKey: [
      user,
      "healthComments",
      `patients/${patientId ? patientId : user.id}/health${commentsCount}`,
    ],
    select,
  });
};

export const useFetchHealthCommentsFiltered = <T = DoctorComment[]>(
  doctor: UserData,
  patientId: number,
  filter: CommentsFilter,
  select?: (data: DoctorComment[]) => T,
  numberOfComments?: number,
) => {
  const commentsCount = numberOfComments
    ? `&startIndex=0&pageSize=${numberOfComments}`
    : "";

  return useQuery<DoctorComment[], Error, T>({
    queryKey: [
      doctor,
      "healthComments",
      `doctors/${doctor.id}/patient/${patientId}/health?filter=${filter}${commentsCount}`,
    ],

    select,
  });
};

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
