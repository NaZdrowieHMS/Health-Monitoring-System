import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  HealthFormDisplayData,
  HealthFormUpload,
  UserData,
} from "properties/types";
import { PaginationData } from "properties/types/api";
import { axiosApi } from "./axios";
import { doctorKeys, patientKeys } from "./utils";
import Toast from "react-native-toast-message";

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

const updateLatestHealthFormCardCache = (
  queryClient: QueryClient,
  userId: number,
  newHealthForm: HealthFormDisplayData,
) => {
  queryClient.setQueryData(
    patientKeys.healthForms.list(userId, { pageSize: 1 }),
    () => [newHealthForm],
  );
};

const updateWithNewHealthFormCache = (
  queryClient: QueryClient,
  userId: number,
  newHealthForm: HealthFormDisplayData,
) => {
  queryClient.setQueryData(
    patientKeys.healthForms.specific(userId, newHealthForm.id),
    () => [newHealthForm],
  );
};

export const useSendHealthForm = (user: UserData) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (form: HealthFormUpload) => {
      if (form.content.length === 0) {
        throw new Error("Proszę nie wysyłać pustego formularza zdrowia");
      } else {
        const { data } = await axiosApi.post("forms", form);
        return data;
      }
    },
    onSuccess(newHealthForm: HealthFormDisplayData) {
      // update latest health form and save it in cache
      updateLatestHealthFormCardCache(queryClient, user.id, newHealthForm);
      updateWithNewHealthFormCache(queryClient, user.id, newHealthForm);
      Toast.show({
        type: "success",
        text1: "Pomyślnie wysłano formularz zdrowia",
      });
    },
    onError(error) {
      Toast.show({
        type: "error",
        text1: "Błąd przy wysyłaniu formularza",
        text2: "Wiadomość błędu: " + error.message,
      });
    },
  });
};
