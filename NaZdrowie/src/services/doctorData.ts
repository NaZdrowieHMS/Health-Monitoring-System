import { useQuery } from "@tanstack/react-query";
import { UserData } from "properties/types";
import { PatientData, PatientResult } from "properties/types/PatientDataProps";

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

export const useFetchAllPatients = <T = PatientData[]>(
  user: UserData,
  select?: (data: PatientData[]) => T,
) => {
  return useQuery<PatientData[], Error, T>({
    queryKey: [user, `doctors/${user.id}/patients`],
    select,
  });
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
