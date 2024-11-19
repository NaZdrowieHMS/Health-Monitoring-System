import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  HealthFormDisplayData,
  HealthFormUpload,
  UserData,
} from "properties/types";
import {
  PatientData,
  PatientReferral,
  PatientResult,
  ResultUpload,
} from "properties/types/PatientDataProps";
import { Alert } from "react-native";

import { axiosApi } from "./axios";

export const useFetchReferrals = <T = PatientReferral[]>(
  user: UserData,
  select?: (data: PatientReferral[]) => T,
  patientId?: number,
  numberOfReferrals?: number,
) => {
  const referralsCount = numberOfReferrals
    ? `?startIndex=0&pageSize=${numberOfReferrals}`
    : "";

  return useQuery<PatientReferral[], Error, T>({
    queryKey: [
      user,
      "referrals",
      `patients/${patientId ? patientId : user.id}/referrals${referralsCount}`,
    ],
    select,
  });
};

export const useFetchResults = <T = PatientResult[]>(
  user: UserData,
  select?: (data: PatientResult[]) => T,
  patientId?: number,
  numberOfResults?: number,
) => {
  const resultsCount = numberOfResults
    ? `?startIndex=0&pageSize=${numberOfResults}`
    : "";

  return useQuery<PatientResult[], Error, T>({
    queryKey: patientId
      ? [
          user,
          "results",
          patientId,
          `patients/${patientId ? patientId : user.id}/results${resultsCount}`,
        ]
      : [
          user,
          "results",
          `patients/${patientId ? patientId : user.id}/results${resultsCount}`,
        ],
    select,
  });
};

export const useFetchPatient = <T = PatientData>(
  user: UserData,
  select?: (data: PatientData) => T,
  patientId?: number,
) => {
  return useQuery<PatientData, Error, T>({
    queryKey: [user, `patients/${patientId ? patientId : user.id}`],
    select,
  });
};

export const useSendResult = (user: UserData, isreferralAssigned: boolean) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (resultUpload: ResultUpload) => {
      const { data } = await axiosApi.post("results", resultUpload);
      return data;
    },
    onSuccess(data: PatientResult) {
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
  patientId?: number,
  numberOfForms?: number,
) => {
  const formsCount = numberOfForms
    ? `?startIndex=0&pageSize=${numberOfForms}`
    : "";

  return useQuery<HealthFormDisplayData[], Error, T>({
    queryKey: [
      user,
      "healthForm",
      `patients/${patientId ? patientId : user.id}/forms${formsCount}`,
    ],
    select,
  });
};

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
