import { AiPrediction, AiPredictionInfo } from "properties/types/AiDataProps";
import { axiosAiApi, axiosApi } from "./axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ResultChange, UserData } from "properties/types";
import { PaginationData } from "properties/types/api";
import { doctorKeys } from "./utils";
import Toast from "react-native-toast-message";

export const useAnalyzeResultsWithAi = (user: UserData, patientId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (predictionData: AiPredictionInfo) => {
      const { data } = await axiosAiApi.post("ai/predictions", predictionData);
      return data as { requestId: number };
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: doctorKeys.patient.predictions.core(user.id, patientId),
      });
      Toast.show({
        type: "success",
        text1: "Pomyślnie wysłano wyniki do przetworzenia",
      });
    },
    onError(error) {
      Toast.show({
        type: "error",
        text1: "Błąd przy wysyłaniu wyników badań do predykcji",
        text2: "Wiadomość błędu:" + error.message,
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
      const { data } = await axiosApi.get("predictions/request", {
        params: {
          ...pagination,
          patientId,
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

export const useAddAiSelectedResults = () => {
  return useMutation({
    mutationFn: async (AiSelectedChanges: ResultChange[]) => {
      const { data } = await axiosApi.put(
        "results/ai-selected",
        AiSelectedChanges,
      );
      return data;
    },
  });
};

export const useDeleteAiSelectedResults = () => {
  return useMutation({
    mutationFn: async (AiSelectedChanges: ResultChange[]) => {
      const { data } = await axiosApi.delete("results/ai-selected", {
        data: AiSelectedChanges,
      });
      return data;
    },
  });
};
