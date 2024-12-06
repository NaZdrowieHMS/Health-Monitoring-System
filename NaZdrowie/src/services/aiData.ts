import {
  AiHealthFormAnalysis,
  AiPrediction,
  AiPredictionInfo,
} from "properties/types/AiDataProps";
import { axiosAiApi, axiosApi } from "./axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AiSelectedChange, UserData } from "properties/types";
import { PaginationData } from "properties/types/api";
import { doctorKeys } from "./utils";
import { Alert } from "react-native";

export const useAnalyzeResultsWithAi = (user: UserData, patientId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (predictionData: AiPredictionInfo) => {
      const { data } = await axiosAiApi.post("ai/predictions", predictionData);
      return data as { requestId: number };
    },
    onSuccess({ requestId }) {
      // when pagination is defined for this data - use it here
      queryClient.invalidateQueries({
        queryKey: doctorKeys.patient.predictions.list(user.id, patientId),
      });
      // fetch new prediction info
      // useFetchPrediciton(user, patientId, requestId);
    },
    onError(error) {
      Alert.alert(
        "Błąd przy wysyłaniu wyników badań do predykcji",
        "Wiadomość błędu:" + error.message,
      );
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

export const useAnalyzeNewHealthForm = (user: UserData, patientId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    // queryKey: doctorKeys.patient.predictions.healthForm(user.id, patientId),
    mutationFn: async (healthFormId: number) => {
      const { data } = await axiosAiApi.get(
        `ai/forms/${healthFormId}/analysis`,
      );
      return data as AiHealthFormAnalysis;
    },
    onSuccess(newHealthFormAnalysis) {
      queryClient.setQueryData(
        doctorKeys.patient.predictions.healthForm(user.id, patientId),
        newHealthFormAnalysis,
      );
    },
  });
};

export const useFetchLatestHealthFormAnalysis = <T = AiHealthFormAnalysis>(
  user: UserData,
  patientId: number,
  healthFormId: number,
  select?: (data: AiPrediction) => T,
) => {
  return useQuery<AiPrediction, Error, T>({
    queryKey: doctorKeys.patient.predictions.healthForm(user.id, patientId),
    queryFn: async () => {
      const { data } = await axiosApi.get(`forms/${healthFormId}/analysis`);
      return data;
    },
    select,
  });
};

export const useAddAiSelectedResults = () => {
  return useMutation({
    mutationFn: async (AiSelectedChanges: AiSelectedChange[]) => {
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
    mutationFn: async (AiSelectedChanges: AiSelectedChange[]) => {
      const { data } = await axiosApi.delete("results/ai-selected", {
        data: AiSelectedChanges,
      });
      return data;
    },
  });
};
