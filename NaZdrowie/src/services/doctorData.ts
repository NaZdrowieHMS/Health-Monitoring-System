import axios from "axios";
import { PatientData, ResultsData } from "properties/types/PatientDataProps";

import { API_URL } from "./config";

export const getLatestPatients: (
  doctorId: number,
) => Promise<PatientData[]> = async (doctorId: number) => {
  try {
    const response = await axios.get(
      `${API_URL}doctors/${doctorId}/all-patients`,
    );
    return response.data;
  } catch (error) {
    console.error("[getLatestPatients] Error fetching data:", error);
  }
};

export const getLatestResults: (doctorId: number) => Promise<
  (ResultsData & {
    patient: PatientData;
  })[]
> = async (doctorId: number) => {
  // return []; // while no unviewed-results endpoint is present
  try {
    const response = await axios.get(
      `${API_URL}doctors/${doctorId}/unviewed-results`,
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
    const response = await axios.get(
      `${API_URL}doctors/${doctorId}/all-patients`,
    );
    return response.data;
  } catch (error) {
    console.error("[getAllPatients] Error fetching data:", error);
  }
};
