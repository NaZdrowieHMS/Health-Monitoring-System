import { PatientData, PatientResult } from "properties/types/PatientDataProps";

import axiosInstance from "./axios";

export const getLatestPatients: (
  doctorId: number,
) => Promise<PatientData[]> = async (doctorId: number) => {
  try {
    const response = await axiosInstance.get(`/doctors/${doctorId}/patients`);
    return response.data;
  } catch (error) {
    console.error("[getLatestPatients] Error fetching data:", error);
  }
};

export const getLatestResults: (doctorId: number) => Promise<
  (PatientResult & {
    patient: PatientData;
  })[]
> = async (doctorId: number) => {
  try {
    const response = await axiosInstance.get(
      `/doctors/${doctorId}/results/unviewed`,
    );
    return response.data;
  } catch (error) {
    console.error("[getLatestResults] Error fetching data:", error);
  }
};

export const getAllPatients: (
  doctorId: number,
) => Promise<PatientData[]> = async (doctorId: number) => {
  try {
    const response = await axiosInstance.get(`/doctors/${doctorId}/patients`);
    return response.data;
  } catch (error) {
    console.error("[getAllPatients] Error fetching data:", error);
  }
};
