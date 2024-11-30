import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserData } from "properties/types";
import { PatientData } from "properties/types/api/PatientDataProps";
import { Alert } from "react-native";

import { axiosApi } from "./axios";
import { doctorKeys, patientKeys } from "./utils";

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
