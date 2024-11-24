import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  HealthFormDisplayData,
  HealthFormUpload,
  UserData,
} from "properties/types";
import {
  PatientData,
  PatientReferral,
} from "properties/types/PatientDataProps";
import { Alert } from "react-native";

import { axiosApi } from "./axios";
import { ResultOverview, ResultUpload } from "properties/types/api/ResultProps";
import { doctorKeys, patientKeys } from "./queryKeyFactory";
import { PaginationData } from "properties/types/api";

export const useFetchReferrals = <T = PatientReferral[]>(
  user: UserData,
  select?: (data: PatientReferral[]) => T,
  pagination?: PaginationData,
  patientId?: number,
) => {
  return useQuery<PatientReferral[], Error, T>({
    queryKey: patientId
      ? doctorKeys.patient.referrals.list(user.id, patientId, pagination)
      : patientKeys.referrals.list(user.id, pagination),
    queryFn: async () => {
      const { data } = await axiosApi.get("referrals", {
        params: {
          patientId,
          ...pagination,
        },
      });
      return data;
    },
    select,
  });
};

export const useFetchPatient = <T = PatientData>(
  user: UserData,
  select?: (data: PatientData) => T,
  patientId?: number,
) => {
  return useQuery<PatientData, Error, T>({
    queryKey: patientId
      ? doctorKeys.patient.specific(user.id, patientId)
      : patientKeys.info(user.id),
    queryFn: async () => {
      const { data } = await axiosApi.get(
        `patients/${patientId ? patientId : user.id}`,
      );
      return data;
    },
    select,
  });
};

// TODO
export const useSendResult = (user: UserData, isreferralAssigned: boolean) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (resultUpload: ResultUpload) => {
      const { data } = await axiosApi.post("results", resultUpload);
      return data;
    },
    onSuccess(data: ResultOverview) {
      queryClient.invalidateQueries({
        queryKey: [user, "results"],
      });
      if (isreferralAssigned) {
        queryClient.invalidateQueries({
          queryKey: [user, "referrals"],
        });
      }
    },
  });
};

export const useFetchHealthForms = <T = HealthFormDisplayData[]>(
  user: UserData,
  select?: (data: HealthFormDisplayData[]) => T,
  pagination?: PaginationData,
  patientId?: number,
) => {
  return useQuery<HealthFormDisplayData[], Error, T>({
    queryKey: patientId
      ? doctorKeys.patient.healthForms.list(user.id, patientId, pagination)
      : patientKeys.healthForms.list(user.id, pagination),
    queryFn: async () => {
      const { data } = await axiosApi.get("forms", {
        params: {
          patientId,
          ...pagination,
        },
      });
      return data;
    },
    select,
  });
};

// TODO
export const useSendHealthForm = (user: UserData) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (form: HealthFormUpload) => {
      const { data } = await axiosApi.post("forms", form);
      return data;
    },
    onSuccess(data: HealthFormDisplayData) {
      queryClient.invalidateQueries({
        queryKey: [user, "healthForm"],
      });
    },
  });
};

// TODO
export const useBindPatientToDoctor = (user: UserData) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (usersInfo: { doctorId: number; patientId: number }) => {
      const { data } = await axiosApi.put(
        "doctors/patients/relation",
        usersInfo,
      );
      return data;
    },
    onSuccess(data) {
      Alert.alert("Połączenie zostało utworzone pomyślnie");
      if (user.isDoctor) {
        queryClient.invalidateQueries({
          queryKey: [user, `doctors/${user.id}/patients/unassigned`],
        });
        queryClient.invalidateQueries({
          queryKey: [user, `doctors/${user.id}/patients`],
        });
        queryClient.invalidateQueries({
          queryKey: [user, `doctors/${user.id}/results/unviewed`],
        });
      } else {
        // queryClient.invalidateQueries({ queryKey: [user, 'doctors/endpoint/TODO'] })
        // refetch list of all doctors (for patient) - curerntly not implemented
      }
    },
  });
};
