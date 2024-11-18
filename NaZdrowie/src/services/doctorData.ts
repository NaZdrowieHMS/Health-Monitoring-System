import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PatientReferralUpload, UserData } from "properties/types";
import {
  PatientData,
  PatientReferral,
  PatientResult,
} from "properties/types/PatientDataProps";

import axiosInstance from "./axios";

export const useFetchUnviewedResults = <
  T = (PatientResult & {
    patient: PatientData;
  })[],
>(
  user: UserData,
  select?: (
    data: (PatientResult & {
      patient: PatientData;
    })[],
  ) => T,
) => {
  return useQuery<
    (PatientResult & {
      patient: PatientData;
    })[],
    Error,
    T
  >({
    queryKey: [user, `doctors/${user.id}/results/unviewed`],
    select,
  });
};

export const useFetchPatientResults = <T = PatientResult[]>(
  user: UserData,
  patientId: number,
  select?: (data: PatientResult[]) => T,
  numberOfResults?: number,
) => {
  const resultsCount = numberOfResults
    ? `?startIndex=0&pageSize=${numberOfResults}`
    : "";

  return useQuery<PatientResult[], Error, T>({
    queryKey: [user, patientId, "results"],
    queryFn: () =>
      axiosInstance
        .get(
          `doctors/${user.id}/patients/${patientId}/results${resultsCount}`,
        )
        .then((response) => response.data),
    select,
  });
};

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
      const { data } = await axiosInstance.post("referrals", referralUpload);
      return data;
    },
    onSuccess(data: PatientReferral) {
      queryClient.invalidateQueries({
        queryKey: [user, "referrals"],
      });
    },
  });
};
