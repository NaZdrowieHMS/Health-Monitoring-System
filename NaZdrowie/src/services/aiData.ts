import { AiPrediction, AiPredictionInfo } from "properties/types/AiDataProps";
import { axiosAiApi, axiosApi } from "./axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserData } from "properties/types";
import { PaginationData } from "properties/types/api";
import { doctorKeys } from "./utils";

export const useAnalyzeWithAi = (user: UserData, patientId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (predictionData: AiPredictionInfo) => {
      const { data } = await axiosAiApi.post("ai/predictions", predictionData);
      return data;
    },
    onSuccess({ requestId }: { requestId: number }) {
      // when pagination is defined for this data - use it here
      queryClient.invalidateQueries({
        queryKey: doctorKeys.patient.predictions.list(user.id, patientId),
      });
      // fetch new prediction info
      useFetchPrediciton(user, patientId, requestId);
    },
  });
};

// why is this endpoint in regular API?
export const useFetchPatientPredictions = <T = AiPrediction[]>(
  user: UserData,
  patientId: number,
  select?: (data: AiPrediction[]) => T,
  pagination?: PaginationData,
) => {
  return useQuery<AiPrediction[], Error, T>({
    queryKey: doctorKeys.patient.predictions.list(
      user.id,
      patientId,
      pagination,
    ),
    queryFn: async () => {
      const { data } = await axiosApi.get(`patients/${patientId}/predictions`, {
        params: {
          ...pagination,
        },
      });
      return data;
    },
    select,
  });
};

export const useFetchPrediciton = <T = AiPrediction>(
  user: UserData,
  patientId: number,
  predictionId: number,
  select?: (data: AiPrediction) => T,
) => {
  return useQuery<AiPrediction, Error, T>({
    queryKey: doctorKeys.patient.predictions.specific(
      user.id,
      patientId,
      predictionId,
    ),
    queryFn: async () => {
      const { data } = await axiosAiApi.get(`ai/predictions/${predictionId}`);
      return data;
    },
    select,
  });
};
