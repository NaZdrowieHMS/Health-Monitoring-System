import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PatientReferralUpload, UserData } from "properties/types";
import {
  PatientData,
  PatientReferral,
  PatientResult,
  ResultUpload,
} from "properties/types/PatientDataProps";
import axiosInstance from "./axios";

export const useFetchLatestPatients = <T = PatientData[]>(
  user: UserData,
  select?: (data: PatientData[]) => T,
) => {
  return useQuery<PatientData[], Error, T>({
    queryKey: [user, `doctors/${user.id}/patients`],
    select,
  });
};

export const useFetchLatestResults = <
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

export const useFetchAllPatients = <T = PatientData[]>(
  user: UserData,
  select?: (data: PatientData[]) => T,
) => {
  return useQuery<PatientData[], Error, T>({
    queryKey: [user, `doctors/${user.id}/patients`],
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
