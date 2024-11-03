import axios from "axios";
import {
  PatientData,
  PatientReferral,
  PatientResult,
  Comment,
} from "properties/types/PatientDataProps";

import { API_URL } from "./config";

export const getHealthComments: (
  patientId: number,
) => Promise<Comment[]> = async (patientId: number) => {
  try {
    const response = await axios.get(`${API_URL}patients/${patientId}/health`);
    return response.data;
  } catch (error) {
    console.error("[getHealthComments] Error fetching data:", error);
  }
};

export const getReferrals: (
  patientId: number,
) => Promise<PatientReferral[]> = async (patientId: number) => {
  try {
    const response = await axios.get(
      `${API_URL}patients/${patientId}/referrals`,
    );
    return response.data;
  } catch (error) {
    console.error("[getReferrals] Error fetching data:", error);
  }
};

export const getResults: (
  patientId: number,
) => Promise<PatientResult[]> = async (patientId: number) => {
  try {
    const response = await axios.get(`${API_URL}patients/${patientId}/results`);
    return response.data;
  } catch (error) {
    console.error("[getResults] Error fetching data:", error);
  }
};

export const getPatient: (patientId: number) => Promise<PatientData> = async (
  patientId: number,
) => {
  try {
    const response = await axios.get(`${API_URL}patients/${patientId}`);
    return response.data.data;
  } catch (error) {
    console.error("[getPatient] Error fetching data:", error);
  }
};
