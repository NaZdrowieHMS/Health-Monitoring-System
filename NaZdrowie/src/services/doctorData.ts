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
      queryClient.setQueryData(
        [user, `patients/${data.patientId}/referrals`],
        (previousData: PatientReferral[]) => [...previousData, data],
      );
    },
  });
};
