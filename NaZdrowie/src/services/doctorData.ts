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
import { doctorKeys } from "./utils";
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
    queryKey: doctorKeys.patients.unassigned.list(user.id, pagination),
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

export const useUploadReferral = (user: UserData) => {
  const queryClient = useQueryClient();
  let patientId: number = null;
  return useMutation({
    mutationFn: async (referralUpload: PatientReferralUpload) => {
      patientId = referralUpload.patientId;
      const { data } = await axiosApi.post("referrals", referralUpload);
      return data;
    },
    onSuccess(newReferral: PatientReferral) {
      // updated - all wueries with refferal data will have additional result (careful with pagination!!)
      // and new referral is stored in cache - no request should be sent for details
      queryClient.setQueriesData(
        { queryKey: doctorKeys.patient.referrals.core(user.id, patientId) },
        (oldReferrals: PatientReferral[]) => {
          if (oldReferrals !== undefined) {
            return [newReferral, ...oldReferrals];
          }
        },
      );
      queryClient.setQueryData(
        doctorKeys.patient.referrals.specific(
          user.id,
          patientId,
          newReferral.id,
        ),
        () => newReferral,
      );
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
