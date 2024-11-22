import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AiSelectedChange,
  PatientReferralUpload,
  UserData,
} from "properties/types";
import {
  PatientData,
  PatientReferral,
} from "properties/types/PatientDataProps";

import { axiosApi } from "./axios";

export const useFetchPatients = <T = PatientData[]>(
  user: UserData,
  select?: (data: PatientData[]) => T,
  numberOfPatients?: number,
) => {
  const patientsCount = numberOfPatients
    ? `?startIndex=0&pageSize=${numberOfPatients}`
    : "";
  return useQuery<PatientData[], Error, T>({
    queryKey: [user, `doctors/${user.id}/patients${patientsCount}`],
    select,
  });
};

export const useFetchAllUnassignedPatients = <T = PatientData[]>(
  user: UserData,
  select?: (data: PatientData[]) => T,
) => {
  return useQuery<PatientData[], Error, T>({
    queryKey: [user, `doctors/${user.id}/patients/unassigned`],
    select,
  });
};

export const useUploadReferral = (user: UserData) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (referralUpload: PatientReferralUpload) => {
      const { data } = await axiosApi.post("referrals", referralUpload);
      return data;
    },
    onSuccess(data: PatientReferral) {
      queryClient.invalidateQueries({
        queryKey: [user, "referrals"],
      });
    },
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
        data: {
          source: AiSelectedChanges,
        },
      });
      return data;
    },
  });
};
