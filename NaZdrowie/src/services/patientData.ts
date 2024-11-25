import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  HealthFormDisplayData,
  HealthFormUpload,
  UserData,
} from "properties/types";
import {
  PatientData,
  PatientReferral,
} from "properties/types/PatientDataProps";
import { Alert } from "react-native";

import { axiosApi } from "./axios";
import {
  DetailedResult,
  ResultOverview,
  ResultUpload,
} from "properties/types/api/ResultProps";
import {
  doctorKeys,
  patientDataPagination,
  patientKeys,
  resultsDataPagination,
} from "./utils";
import { PaginationData } from "properties/types/api";

export const useFetchReferrals = <T = PatientReferral[]>(
  user: UserData,
  select?: (data: PatientReferral[]) => T,
  pagination?: PaginationData,
  patientId?: number,
) => {
  return useQuery<PatientReferral[], Error, T>({
    queryKey: patientId
      ? doctorKeys.patient.referrals.list(user.id, patientId, pagination)
      : patientKeys.referrals.list(user.id, pagination),
    queryFn: async () => {
      const { data } = await axiosApi.get("referrals", {
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

export const useFetchReferral = <T = PatientReferral>(
  user: UserData,
  referralId: number,
  select?: (data: PatientReferral) => T,
  patientId?: number,
) => {
  return useQuery<PatientReferral, Error, T>({
    queryKey: patientId
      ? doctorKeys.patient.referrals.specific(user.id, patientId, referralId)
      : patientKeys.referrals.specific(user.id, referralId),
    queryFn: async () => {
      const { data } = await axiosApi.get(`referrals/${referralId}`);
      return data;
    },
    select,
  });
};

export const useFetchPatient = <T = PatientData>(
  user: UserData,
  select?: (data: PatientData) => T,
  patientId?: number,
) => {
  return useQuery<PatientData, Error, T>({
    queryKey: patientId
      ? doctorKeys.patient.specific(user.id, patientId)
      : patientKeys.info(user.id),
    queryFn: async () => {
      const { data } = await axiosApi.get(
        `patients/${patientId ? patientId : user.id}`,
      );
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
            (oldReferrals: PatientReferral[]) =>
              oldReferrals.filter((referral) => referral.id !== referralId),
          );
          queryClient.setQueriesData(
            {
              queryKey: doctorKeys.patient.referrals.core(
                user.id,
                newResult.patientId,
              ),
            },
            (oldReferrals: PatientReferral[]) =>
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
            (oldReferrals: PatientReferral[]) =>
              oldReferrals.filter((referral) => referral.id !== referralId),
          );
          queryClient.setQueriesData(
            {
              queryKey: patientKeys.referrals.core(user.id),
            },
            (oldReferrals: PatientReferral[]) =>
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

export const useFetchHealthForms = <T = HealthFormDisplayData[]>(
  user: UserData,
  select?: (data: HealthFormDisplayData[]) => T,
  pagination?: PaginationData,
  patientId?: number,
) => {
  return useQuery<HealthFormDisplayData[], Error, T>({
    queryKey: patientId
      ? doctorKeys.patient.healthForms.list(user.id, patientId, pagination)
      : patientKeys.healthForms.list(user.id, pagination),
    queryFn: async () => {
      const { data } = await axiosApi.get("forms", {
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

export const useFetchHealthForm = <T = HealthFormDisplayData>(
  user: UserData,
  healthFormId: number,
  select?: (data: HealthFormDisplayData) => T,
  patientId?: number,
) => {
  return useQuery<HealthFormDisplayData, Error, T>({
    queryKey: patientId
      ? doctorKeys.patient.healthForms.specific(
          user.id,
          patientId,
          healthFormId,
        )
      : patientKeys.healthForms.specific(user.id, healthFormId),
    queryFn: async () => {
      const { data } = await axiosApi.get(`forms/${healthFormId}`);
      return data;
    },
    select,
  });
};

export const useSendHealthForm = (user: UserData) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (form: HealthFormUpload) => {
      const { data } = await axiosApi.post("forms", form);
      return data;
    },
    onSuccess(newHealthForm: HealthFormDisplayData) {
      // update latest health form and save it in cache
      queryClient.setQueryData(
        patientKeys.healthForms.list(
          user.id,
          patientDataPagination.latestHealthForm,
        ),
        () => newHealthForm,
      );
      queryClient.setQueryData(
        patientKeys.healthForms.specific(user.id, newHealthForm.id),
        () => newHealthForm,
      );
    },
  });
};

export const useBindPatientToDoctor = (user: UserData) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (usersInfo: { doctorId: number; patientId: number }) => {
      const { data } = await axiosApi.put(
        "doctors/patients/relation",
        usersInfo,
      );
      return data;
    },
    onSuccess(data: { doctorId: number; patientId: number }) {
      // big changes, maybe later add cache updating
      Alert.alert("Połączenie zostało utworzone pomyślnie");
      if (user.isDoctor) {
        queryClient.invalidateQueries({
          queryKey: doctorKeys.patients.unassigned.core(data.doctorId),
        });
        queryClient.invalidateQueries({
          queryKey: doctorKeys.patients.core(data.doctorId),
        });
        queryClient.invalidateQueries({
          queryKey: doctorKeys.resultsUnviewed(data.doctorId),
        });
      } else {
        // refetch list of all doctors (for patient) - curerntly not implemented
      }
    },
  });
};
