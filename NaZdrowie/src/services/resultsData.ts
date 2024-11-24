import { useQuery } from "@tanstack/react-query";
import { UserData } from "properties/types";
import {
  DetailedResult,
  ResultOverview,
} from "properties/types/api/ResultProps";

export const useFetchAllResultsByPatientId = <T = ResultOverview[]>(
  user: UserData,
  select?: (data: ResultOverview[]) => T,
  patientId?: number,
  numberOfResults?: number,
) => {
  const resultsCount = numberOfResults
    ? `&startIndex=0&pageSize=${numberOfResults}`
    : "";

  patientId = patientId ? patientId : user.id;
  const url = `results?patientId=${patientId}${resultsCount}`;

  return useQuery<ResultOverview[], Error, T>({
    queryKey: [user, "results", patientId, url],

    select,
  });
};

export const useFetchResult = <T = DetailedResult>(
  user: UserData,
  resultId: number,
  select?: (data: DetailedResult) => T,
) => {
  const url = `results/${resultId}`;
  return useQuery<DetailedResult, Error, T>({
    queryKey: [user, "result", resultId, url],

    select,
  });
};

// Currently only for doctors, for patient it will return authentication error
export const useFetchUnviewedResults = <T = ResultOverview[]>(
  user: UserData,
  select?: (data: ResultOverview[]) => T,
  numberOfResults?: number,
) => {
  const resultsCount = numberOfResults
    ? `?startIndex=0&pageSize=${numberOfResults}`
    : "";

  const url = `results/unviewed${resultsCount}`;

  return useQuery<ResultOverview[], Error, T>({
    meta: { headers: { userId: user.id } },
    queryKey: [user, "unviewedResults", url],
    select,
  });
};
