import { useQuery } from "@tanstack/react-query";
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

// to be done, mutation required here
export const sendResult: (
  resultUpload: ResultUpload,
) => Promise<string> = async (resultUpload: ResultUpload) => {
  try {
    const response = await axiosInstance.post(`results`, resultUpload);
    return response.data;
  } catch (error) {
    console.error("[sendResult] Result not added", error);
  }
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
