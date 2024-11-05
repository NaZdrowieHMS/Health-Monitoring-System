import { DoctorComment } from "properties/types";
import {
  PatientData,
  PatientReferral,
  PatientResult,
  ResultUpload,
} from "properties/types/PatientDataProps";

import axiosInstance from "./axios";

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
