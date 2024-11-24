import { AiPrediction, AiPredictionInfo } from "properties/types/AiDataProps";
import { axiosAiApi } from "./axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserData } from "properties/types";
import { PaginationData } from "properties/types/api";
import { doctorKeys } from "./queryKeyFactory";

export const useAnalyzeWithAi = (user: UserData, patientId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (predictionData: AiPredictionInfo) => {
      const { data } = await axiosAiApi.post("ai/predictions", predictionData);
      return data;
    },
    onSuccess(data: { requestId: number }) {
      queryClient.invalidateQueries({
        queryKey: [user, patientId, "predictions"],
      });
    },
  });
};

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
      const { data } = await axiosAiApi.get(
        `patients/${patientId}/predictions`,
        {
          params: {
            ...pagination,
          },
        },
      );
      return data;
    },
    select,
  });
};
