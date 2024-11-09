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

export const getHealthComments: (
  patientId: number,
) => Promise<DoctorComment[]> = async (patientId: number) => {
  try {
    const response = await axiosInstance.get(`patients/${patientId}/health`);
    return response.data;
  } catch (error) {
    console.error("[getHealthComments] Error fetching data:", error);
  }
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

export const getReferrals: (
  patientId: number,
) => Promise<PatientReferral[]> = async (patientId: number) => {
  try {
    const response = await axiosInstance.get(`patients/${patientId}/referrals`);
    return response.data;
  } catch (error) {
    console.error("[getReferrals] Error fetching data:", error);
  }
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

export const getResults: (
  patientId: number,
) => Promise<PatientResult[]> = async (patientId: number) => {
  try {
    const response = await axiosInstance.get(`patients/${patientId}/results`);
    return response.data;
  } catch (error) {
    console.error("[getResults] Error fetching data:", error);
  }
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

export const getPatient: (patientId: number) => Promise<PatientData> = async (
  patientId: number,
) => {
  try {
    const response = await axiosInstance.get(`patients/${patientId}`);
    return response.data;
  } catch (error) {
    console.error("[getPatient] Error fetching data:", error);
  }
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

export const getLatestHealthForm: (
  patientId: number,
) => Promise<HealthFormDisplayData | null> = async (patientId: number) => {
  try {
    const response = await axiosInstance.get(
      `patients/${patientId}/forms/latest`,
    );
    return response.data;
  } catch (error) {
    console.error("[getLatestHealthForm] Error fetching data:", error);
    return null;
  }
};
