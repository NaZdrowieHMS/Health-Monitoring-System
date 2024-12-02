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
  ResultContent,
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

function partiallyUpdateSpecificResultCache(
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
      partiallyUpdateSpecificResultCache(queryClient, user.id, patientId, data);
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

export const useFetchResultContent = <T = ResultContent>(
  user: UserData,
  resultId: number,
  patientId?: number,
) => {
  return useQuery<ResultContent, Error, T>({
    queryKey: patientId
      ? doctorKeys.patient.results.specificContent(user.id, patientId, resultId)
      : patientKeys.results.specificContent(user.id, resultId),
    queryFn: async () => {
      const { data } = await axiosApi.get(`results/${resultId}/data`);
      return data;
    },
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

const updatePatientResultCardCache = (
  queryClient: QueryClient,
  user: UserData,
  newResult: DetailedResult,
) => {
  if (user.isDoctor)
    queryClient.setQueryData(
      doctorKeys.patient.results.list(
        user.id,
        newResult.patientId,
        resultsDataPagination.latestResults,
      ),
      (oldResults: ResultOverview[]) => [newResult, ...oldResults.slice(0, -1)],
    );
  else
    queryClient.setQueryData(
      patientKeys.results.list(user.id, resultsDataPagination.latestResults),
      (oldResults: ResultOverview[]) => [newResult, ...oldResults.slice(0, -1)],
    );
};

const setNewResultDataCache = (
  queryClient: QueryClient,
  user: UserData,
  newResult: DetailedResult,
) => {
  if (user.isDoctor) {
    queryClient.setQueryData(
      doctorKeys.patient.results.specific(
        user.id,
        newResult.patientId,
        newResult.id,
      ),
      () => newResult,
    );
  } else {
    queryClient.setQueryData(
      patientKeys.results.specific(user.id, newResult.id),
      () => newResult,
    );
  }
};

const updatePatientReferralCardCache = (
  queryClient: QueryClient,
  user: UserData,
  newResult: DetailedResult,
  referralId: number,
) => {
  if (user.isDoctor)
    queryClient.setQueryData(
      doctorKeys.patient.referrals.list(
        user.id,
        newResult.patientId,
        patientDataPagination.latestReferrals,
      ),
      (oldReferrals: Referral[]) =>
        oldReferrals.filter((referral) => referral.id !== referralId),
    );
  else
    queryClient.setQueryData(
      patientKeys.referrals.list(
        user.id,
        patientDataPagination.latestReferrals,
      ),
      (oldReferrals: Referral[]) =>
        oldReferrals.filter((referral) => referral.id !== referralId),
    );
};

const updatePatientReferralCacheAsCompleted = (
  queryClient: QueryClient,
  user: UserData,
  newResult: DetailedResult,
  referralId: number,
) => {
  if (user.isDoctor)
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
  else
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
};

export const useSendResult = (user: UserData, isReferralAssigned: boolean) => {
  const queryClient = useQueryClient();
  let referralId: number = undefined;
  return useMutation({
    mutationFn: async (resultUpload: ResultUpload) => {
      referralId = resultUpload.referralId;
      const { data } = await axiosApi.post("results", resultUpload);
      return data;
    },
    onSuccess(newResult: DetailedResult) {
      console.log(referralId);
      updatePatientResultCardCache(queryClient, user, newResult);
      setNewResultDataCache(queryClient, user, newResult);
      if (isReferralAssigned) {
        updatePatientReferralCardCache(
          queryClient,
          user,
          newResult,
          referralId,
        );
        updatePatientReferralCacheAsCompleted(
          queryClient,
          user,
          newResult,
          referralId,
        );
      }
    },
  });
};
