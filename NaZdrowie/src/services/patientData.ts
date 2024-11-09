import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DoctorComment,
  HealthFormDisplayData,
  UserData,
} from "properties/types";
import {
  PatientData,
  PatientReferral,
  PatientResult,
  ResultUpload,
} from "properties/types/PatientDataProps";

import axiosInstance from "./axios";

export const useFetchHealthComments = <T = DoctorComment[]>(
  user: UserData,
  select?: (data: DoctorComment[]) => T,
  patientId?: number,
) => {
  return useQuery<DoctorComment[], Error, T>({
    queryKey: [user, `patients/${patientId ? patientId : user.id}/health`],
    select,
  });
};

export const useFetchReferrals = <T = PatientReferral[]>(
  user: UserData,
  select?: (data: PatientReferral[]) => T,
  patientId?: number,
) => {
  return useQuery<PatientReferral[], Error, T>({
    queryKey: [user, `patients/${patientId ? patientId : user.id}/referrals`],
    select,
  });
};
export const useFetchResults = <T = PatientResult[]>(
  user: UserData,
  select?: (data: PatientResult[]) => T,
  patientId?: number,
) => {
  return useQuery<PatientResult[], Error, T>({
    queryKey: [user, `patients/${patientId ? patientId : user.id}/results`],
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
      const { data } = await axiosInstance.post("results", resultUpload);
      return data;
    },
    onSuccess(data: PatientResult) {
      queryClient.setQueryData(
        [user, `patients/${data.patientId}/results`],
        (previousData: PatientResult[]) => [...previousData, data],
      );
      if (isreferralAssigned) {
        queryClient.invalidateQueries({
          queryKey: [user, `patients/${data.patientId}/referrals`],
        });
      }
    },
  });
};

export const useFetchLatestHealthForm = <T = HealthFormDisplayData | null>(
  user: UserData,
  select?: (data: HealthFormDisplayData | null) => T,
  patientId?: number,
) => {
  return useQuery<HealthFormDisplayData | null, Error, T>({
    queryKey: [
      user,
      `patients/${patientId ? patientId : user.id}/forms/latest`,
    ],
    select,
  });
};
