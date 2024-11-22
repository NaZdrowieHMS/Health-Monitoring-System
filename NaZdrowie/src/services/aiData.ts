import { AiPrediction, AiPredictionInfo } from "properties/types/AiDataProps";
import { axiosAiApi } from "./axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserData } from "properties/types";

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
) => {
  return useQuery<AiPrediction[], Error, T>({
    queryKey: [
      user,
      patientId,
      "predictions",
      `patients/${patientId}/predictions`,
    ],
    select,
  });
};
