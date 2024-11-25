import { useQuery } from "@tanstack/react-query";
import { UserData } from "properties/types";
import { PaginationData } from "properties/types/api";
import {
  DetailedResult,
  ResultOverview,
} from "properties/types/api/ResultProps";
import { axiosApi } from "./axios";
import { doctorKeys, patientKeys } from "./utils";

export const useFetchAllResultsByPatientId = <T = ResultOverview[]>(
  user: UserData,
  select?: (data: ResultOverview[]) => T,
  pagination?: PaginationData,
  patientId?: number,
) => {
  return useQuery<ResultOverview[], Error, T>({
    queryKey: patientId
      ? doctorKeys.patient.results.list(user.id, patientId, pagination)
      : patientKeys.results.list(user.id, pagination),
    queryFn: async () => {
      const { data } = await axiosApi.get("results", {
        params: {
          patientId,
          ...pagination,
        },
      });
      return data;
    },
    select,
  });
};

export const useFetchResult = <T = DetailedResult>(
  user: UserData,
  resultId: number,
  select?: (data: DetailedResult) => T,
  patientId?: number,
) => {
  return useQuery<DetailedResult, Error, T>({
    queryKey: patientId
      ? doctorKeys.patient.results.specific(user.id, patientId, resultId)
      : patientKeys.results.specific(user.id, resultId),
    queryFn: async () => {
      const { data } = await axiosApi.get(`results/${resultId}`);
      return data;
    },
    select,
  });
};

// Currently only for doctors, for patient it will return authentication error
export const useFetchUnviewedResults = <T = ResultOverview[]>(
  user: UserData,
  select?: (data: ResultOverview[]) => T,
  pagination?: PaginationData,
) => {
  return useQuery<ResultOverview[], Error, T>({
    queryKey: doctorKeys.resultsUnviewed(user.id),
    queryFn: async () => {
      const { data } = await axiosApi.get("results/unviewed", {
        params: {
          ...pagination,
        },
      });
      return data;
    },
    select,
  });
};
