import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserData } from "properties/types";
import { Alert } from "react-native";

import axiosInstance from "./axios";

export const useBindPatientToDoctor = (user: UserData) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (usersInfo: { doctorId: number; patientId: number }) => {
      console.log("Update binding", usersInfo);
      const { data } = await axiosInstance.put(
        "doctors/patients/relation",
        usersInfo,
      );
      console.log(data);
      return data;
    },
    onSuccess(data) {
      Alert.alert("Binding succesfull");
      if (user.isDoctor) {
        queryClient.invalidateQueries({
          queryKey: [user, `doctors/${user.id}/patients/unassigned`],
        });
        queryClient.invalidateQueries({
          queryKey: [user, `doctors/${user.id}/patients`],
        });
        queryClient.invalidateQueries({
          queryKey: [user, `doctors/${user.id}/results/unviewed`],
        });
      } else {
        // queryClient.invalidateQueries({ queryKey: [user, 'doctors/endpoint/TODO'] })
        // refetch list of all doctors (for patient) - curerntly not implemented
      }
    },
  });
};
