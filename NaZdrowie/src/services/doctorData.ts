import { useQuery } from "@tanstack/react-query";
import { UserData } from "properties/types";
import { PatientData } from "properties/types/api/PatientDataProps";

import { axiosApi } from "./axios";
import { doctorKeys } from "./utils";
import { PaginationData } from "properties/types/api";

export const useFetchPatients = <T = PatientData[]>(
  user: UserData,
  select?: (data: PatientData[]) => T,
  pagination?: PaginationData
) => {
  return useQuery<PatientData[], Error, T>({
    queryKey: doctorKeys.patients.list(user.id, pagination),
    queryFn: async () => {
      const { data } = await axiosApi.get(`doctors/${user.id}/patients`, {
        params: {
          ...pagination,
        },
      });
      return data;
    },
    select,
  });
};

export const useFetchAllUnassignedPatients = <T = PatientData[]>(
  user: UserData,
  select?: (data: PatientData[]) => T,
  pagination?: PaginationData
) => {
  return useQuery<PatientData[], Error, T>({
    queryKey: doctorKeys.patients.unassigned.list(user.id, pagination),
    queryFn: async () => {
      const { data } = await axiosApi.get(
        `doctors/${user.id}/patients/unassigned`,
        {
          params: {
            ...pagination,
          },
        }
      );
      return data;
    },
    select,
  });
};
