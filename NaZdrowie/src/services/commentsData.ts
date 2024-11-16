import { useQuery } from "@tanstack/react-query";
import { DoctorComment, UserData } from "properties/types";
import { CommentsFilter } from "./utils";

export const useFetchResultCommentsData = <T = DoctorComment[]>(
  user: UserData,
  resultId: number,
  select?: (data: DoctorComment[]) => T,
  latestCount?: number,
) => {
  return useQuery<DoctorComment[], Error, T>({
    queryKey: latestCount
      ? [user, `results/${resultId}/comments`]
      : [user, `results/${resultId}/comments`],
    select,
  });
};

export const useFetchHealthComments = <T = DoctorComment[]>(
  user: UserData,
  select?: (data: DoctorComment[]) => T,
  patientId?: number,
) => {
  return useQuery<DoctorComment[], Error, T>({
    queryKey: [user, `patients/${patientId ? patientId : user.id}/health`],
    select,
  });
};

export const useFetchHealthCommentsFiltered = <T = DoctorComment[]>(
  doctor: UserData,
  patientId: number,
  filter: CommentsFilter,
  select?: (data: DoctorComment[]) => T,
) => {
  return useQuery<DoctorComment[], Error, T>({
    queryKey: [
      doctor,
      `doctors/${doctor.id}/patient/${patientId}/health?filter=${filter}`,
    ],
    select,
  });
};
