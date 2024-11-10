import { useQuery } from "@tanstack/react-query";
import { DoctorComment, UserData } from "properties/types";

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
