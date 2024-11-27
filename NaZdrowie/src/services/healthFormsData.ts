import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  HealthFormDisplayData,
  HealthFormUpload,
  UserData,
} from "properties/types";
import { PaginationData } from "properties/types/api";
import { axiosApi } from "./axios";
import { doctorKeys, patientDataPagination, patientKeys } from "./utils";

export const useFetchHealthForms = <T = HealthFormDisplayData[]>(
  user: UserData,
  select?: (data: HealthFormDisplayData[]) => T,
  pagination?: PaginationData,
  patientId?: number
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
  patientId?: number
) => {
  return useQuery<HealthFormDisplayData, Error, T>({
    queryKey: patientId
      ? doctorKeys.patient.healthForms.specific(
          user.id,
          patientId,
          healthFormId
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
          patientDataPagination.latestHealthForm
        ),
        () => newHealthForm
      );
      queryClient.setQueryData(
        patientKeys.healthForms.specific(user.id, newHealthForm.id),
        () => newHealthForm
      );
    },
  });
};
