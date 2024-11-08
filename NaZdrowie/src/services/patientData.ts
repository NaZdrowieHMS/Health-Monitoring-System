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

export const useFetchHealthComments = <T>(
  patient: UserData,
  select?: (data: DoctorComment[]) => T,
) => {
  return useQuery<DoctorComment[], Error, T>({
    queryKey: [patient, `patients/${patient.id}/health`],
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

export const useFetchReferrals = <T>(
  patient: UserData,
  select?: (data: PatientReferral[]) => T,
) => {
  return useQuery<PatientReferral[], Error, T>({
    queryKey: [patient, `patients/${patient.id}/referrals`],
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

export const useFetchResults = <T>(
  patient: UserData,
  select?: (data: PatientResult[]) => T,
) => {
  return useQuery<PatientResult[], Error, T>({
    queryKey: [patient, `patients/${patient.id}/results`],
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

export const useFetchLatestHealthForm = <T>(
  patient: UserData,
  select?: (data: HealthFormDisplayData | null) => T,
) => {
  return useQuery<HealthFormDisplayData | null, Error, T>({
    queryKey: [patient, `patients/${patient.id}/forms/latest`],
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
