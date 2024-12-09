import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Referral, ReferralUpload, UserData } from "properties/types";
import { PaginationData } from "properties/types/api";
import { axiosApi } from "./axios";
import { doctorKeys, patientKeys } from "./utils";
import Toast from "react-native-toast-message";

export const useFetchReferrals = <T = Referral[]>(
  user: UserData,
  select?: (data: Referral[]) => T,
  pagination?: PaginationData,
  patientId?: number,
) => {
  return useQuery<Referral[], Error, T>({
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

export const useFetchReferral = <T = Referral>(
  user: UserData,
  referralId: number,
  select?: (data: Referral) => T,
  patientId?: number,
) => {
  return useQuery<Referral, Error, T>({
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

const updateReferralsCacheWithNewReferral = (
  queryClient: QueryClient,
  userId: number,
  patientId: number,
  newReferral: Referral,
) => {
  queryClient.setQueriesData(
    { queryKey: doctorKeys.patient.referrals.core(userId, patientId) },
    (oldReferrals: Referral[]) => {
      if (oldReferrals !== undefined) {
        return [newReferral, ...oldReferrals];
      }
    },
  );
  queryClient.setQueryData(
    doctorKeys.patient.referrals.specific(userId, patientId, newReferral.id),
    () => newReferral,
  );
};

export const useUploadReferral = (user: UserData) => {
  const queryClient = useQueryClient();
  let patientId: number = null;
  return useMutation({
    mutationFn: async (referralUpload: ReferralUpload) => {
      patientId = referralUpload.patientId;
      const { data } = await axiosApi.post("referrals", referralUpload);
      return data;
    },
    onSuccess(newReferral: Referral) {
      updateReferralsCacheWithNewReferral(
        queryClient,
        user.id,
        patientId,
        newReferral,
      );
      Toast.show({
        type: "success",
        text1: "Pomyślnie utworzono skierowanie",
      });
    },
    onError(error) {
      Toast.show({
        type: "error",
        text1: "Błąd przy tworzeniu skierowania",
        text2: "Wiadomość błędu:" + error.message,
      });
    },
  });
};
