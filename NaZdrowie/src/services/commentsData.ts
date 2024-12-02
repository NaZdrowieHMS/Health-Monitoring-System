import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
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
import { Alert } from "react-native";

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
      ? doctorKeys.patient.healthComments.list(
          user.id,
          patientId,
          pagination,
          filter,
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

const updateCurrentDoctorHealthCommentsCache = (
  queryClient: QueryClient,
  userId: number,
  patientId: number,
  newComment: DoctorComment,
) => {
  queryClient.setQueryData(
    doctorKeys.patient.healthComments.list(
      userId,
      patientId,
      doctorDataPagination.currentDotorComments,
      CommentsFilter.Specific,
    ),
    (oldComments: DoctorComment[]) => {
      if (oldComments !== undefined) {
        return [newComment, ...oldComments.slice(0, -1)];
      }
      return oldComments;
    },
  );
};

// TODO when healthComments screen will be implemented with example below
const updatePatientHealthCommentsCache = () =>
  // queryClient: QueryClient,
  // userId: number,
  // patientId: number,
  // newComment: DoctorComment,
  {
    // queryClient.setQueryData(
    //   doctorKeys.patient.healthComments.list(userId, patientId),
    //   (oldComments: DoctorComment[]) => {
    //     if (oldComments !== undefined) {
    //       return [newComment, ...oldComments];
    //     }
    //     return oldComments;
    //   },
    // );
  };

export const useSendHealthComment = (user: UserData, patientId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (comment: HealthCommentUpload) => {
      const { data } = await axiosApi.post("health", comment);
      return data;
    },
    onSuccess(newComment: DoctorComment) {
      try {
        updateCurrentDoctorHealthCommentsCache(
          queryClient,
          user.id,
          patientId,
          newComment,
        );
        updatePatientHealthCommentsCache();
      } catch (error) {
        console.error(error.message, error.stack);
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
          doctorDataPagination.resultComments,
        ),
        (oldComments: DoctorComment[]) => {
          if (oldComments !== undefined) {
            return [newComment, ...oldComments.slice(0, -1)];
          }
        },
      );
      queryClient.setQueryData(
        doctorKeys.patient.results.specificComments(
          user.id,
          patientId,
          resultId,
        ),
        (oldComments: DoctorComment[]) => {
          if (oldComments !== undefined) {
            return [newComment, ...oldComments];
          }
        },
      );
    },
    onError(error) {
      Alert.alert(
        "Błąd przy wysyłaniu komentarza dla pacjenta",
        "Wiadomość błędu:" + error.message,
      );
    },
  });
};
