import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Referral, UserData } from "properties/types";
import { PaginationData } from "properties/types/api";
import {
  DetailedResult,
  ResultOverview,
  ResultUpload,
} from "properties/types/api/ResultProps";
import { axiosApi } from "./axios";
import {
  doctorKeys,
  patientDataPagination,
  patientKeys,
  resultsDataPagination,
} from "./utils";

export function markPatientSpecificResultDataAsStale(
  queryClient: QueryClient,
  doctorId: number,
  patientId: number,
  resultId: number,
) {
  queryClient.invalidateQueries({
    queryKey: doctorKeys.patient.results.specific(
      doctorId,
      patientId,
      resultId,
    ),
    exact: true,
  });
}

function partiallyUpdateSpecificResultData(
  queryClient: QueryClient,
  doctorId: number,
  patientId: number,
  data: ResultOverview[],
) {
  data.forEach((result) => {
    queryClient.setQueryData(
      doctorKeys.patient.results.specific(doctorId, patientId, result.id),
      (oldResult: DetailedResult | undefined) => {
        if (oldResult !== undefined) {
          return oldResult;
        }
        return result;
      },
    );
    markPatientSpecificResultDataAsStale(
      queryClient,
      doctorId,
      patientId,
      result.id,
    );
  });
}

export const useFetchAllResultsByPatientId = <T = ResultOverview[]>(
  user: UserData,
  select?: (data: ResultOverview[]) => T,
  pagination?: PaginationData,
  patientId?: number,
) => {
  const queryClient = useQueryClient();
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
    select: (data: ResultOverview[]) => {
      partiallyUpdateSpecificResultData(queryClient, user.id, patientId, data);
      return select ? select(data) : (data as T);
    },
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

export const useSendResult = (user: UserData, isreferralAssigned: boolean) => {
  const queryClient = useQueryClient();
  let referralId: number = undefined;
  return useMutation({
    mutationFn: async (resultUpload: ResultUpload) => {
      referralId = resultUpload.referralId;
      const { data } = await axiosApi.post("results", resultUpload);
      return data;
    },
    onSuccess(newResult: DetailedResult) {
      if (user.isDoctor) {
        // insert new result in patient's "Moje Wyniki", and save detailed data (unvieved result doesn't make sense here)
        queryClient.setQueryData(
          doctorKeys.patient.results.list(
            user.id,
            newResult.patientId,
            resultsDataPagination.latestResults,
          ),
          (oldResults: ResultOverview[]) => [newResult, ...oldResults],
        );
        queryClient.setQueryData(
          doctorKeys.patient.results.specific(
            user.id,
            newResult.patientId,
            newResult.id,
          ),
          () => newResult,
        );
        if (isreferralAssigned) {
          // delete from patient's "Moje skierowania" if assigned to referral, change completed to true
          queryClient.setQueryData(
            doctorKeys.patient.referrals.list(
              user.id,
              newResult.patientId,
              patientDataPagination.latestReferrals,
            ),
            (oldReferrals: Referral[]) =>
              oldReferrals.filter((referral) => referral.id !== referralId),
          );
          queryClient.setQueriesData(
            {
              queryKey: doctorKeys.patient.referrals.core(
                user.id,
                newResult.patientId,
              ),
            },
            (oldReferrals: Referral[]) =>
              oldReferrals.map((referral) =>
                referral.id === referralId
                  ? { ...referral, completed: true }
                  : referral,
              ),
          );
        }
      } else {
        // insert new result in "Moje Wyniki", and save detailed data
        queryClient.setQueryData(
          patientKeys.results.list(
            user.id,
            resultsDataPagination.latestResults,
          ),
          (oldResults: ResultOverview[]) => [newResult, ...oldResults],
        );
        queryClient.setQueryData(
          patientKeys.results.specific(user.id, newResult.id),
          () => newResult,
        );
        if (isreferralAssigned) {
          // delete from "Moje skierowania" if assigned to referral, change completed to true
          queryClient.setQueryData(
            patientKeys.referrals.list(
              user.id,
              patientDataPagination.latestReferrals,
            ),
            (oldReferrals: Referral[]) =>
              oldReferrals.filter((referral) => referral.id !== referralId),
          );
          queryClient.setQueriesData(
            {
              queryKey: patientKeys.referrals.core(user.id),
            },
            (oldReferrals: Referral[]) =>
              oldReferrals.map((referral) =>
                referral.id === referralId
                  ? { ...referral, completed: true }
                  : referral,
              ),
          );
        }
      }
    },
  });
};
