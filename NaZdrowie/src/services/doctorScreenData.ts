import axios from "axios";
import {
  PatientData,
  ResultsData,
} from "properties/types/DoctorScreenDataProps";

const API_URL = "http://localhost:5001/api/";

export const getLatestPatients: () => Promise<PatientData[]> = async () => {
  try {
    const response = await axios.get(`${API_URL}patients`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getLatestResults: (doctorId: number) => Promise<
  (ResultsData & {
    patient: PatientData;
  })[]
> = async (doctorId: number) => {
  try {
    const response = await axios.get(
      `${API_URL}doctors/${doctorId}/unviewed-results`,
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getAllPatients: () => Promise<PatientData[]> = async () => {
  try {
    const response = await axios.get(`${API_URL}patients`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
