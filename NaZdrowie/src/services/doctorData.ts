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
import { doctorKeys } from "./queryKeyFactory";
import { PaginationData } from "properties/types/api";

export const useFetchPatients = <T = PatientData[]>(
  user: UserData,
  select?: (data: PatientData[]) => T,
  pagination?: PaginationData,
) => {
  return useQuery<PatientData[], Error, T>({
    queryKey: doctorKeys.patients.list(user.id, pagination),
    queryFn: async () => {
      const { data } = await axiosApi.get(`doctors/${user.id}/patients`, {
        params: {
          ...pagination,
        },
      });
      return data;
    },
    select,
  });
};

export const useFetchAllUnassignedPatients = <T = PatientData[]>(
  user: UserData,
  select?: (data: PatientData[]) => T,
  pagination?: PaginationData,
) => {
  return useQuery<PatientData[], Error, T>({
    queryKey: doctorKeys.patients.unassigned(user.id, pagination),
    queryFn: async () => {
      const { data } = await axiosApi.get(
        `doctors/${user.id}/patients/unassigned`,
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

// TODO
export const useUploadReferral = (user: UserData) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (referralUpload: PatientReferralUpload) => {
      const { data } = await axiosApi.post("referrals", referralUpload);
      return data;
    },
    onSuccess(data: PatientReferral) {
      queryClient.invalidateQueries({
        queryKey: doctorKeys.patient.referrals.list(user.id, data.patientId),
      });
    },
  });
};

// TODO
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

// TODO
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
