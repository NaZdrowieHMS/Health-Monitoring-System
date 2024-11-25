import { LinkButton } from "components/atoms";
import { StringNavigation, UserData } from "properties/types";

import { useDesiredOverlay } from "./useDesiredOverlay";
import { ResultOverview } from "properties/types/api/ResultProps";
import {
  useFetchAllResultsByPatientId,
  useFetchUnviewedResults,
} from "services/resultsData";
import { useNavigation } from "@react-navigation/native";
import { resultsDataPagination } from "services/utils";

export const useResultsData = (currentUser: UserData, patientId?: number) => {
  const { openResultOverlay } = useDesiredOverlay(currentUser);
  const { navigate } = useNavigation<StringNavigation>();
  const navigateToResultPreviewScreen = (
    resultId: number,
    patientId: number,
    resultTitle: string,
  ) => {
    navigate("ResultPreview", {
      resultId,
      patientId,
      resultTitle,
    });
  };

  const formatResultsView = (result: ResultOverview) => ({
    text: result.testType,
    buttons: [
      <LinkButton
        title="Podgląd"
        handleOnClick={() =>
          currentUser.isDoctor
            ? navigateToResultPreviewScreen(
                result.id,
                result.patientId,
                result.testType,
              )
            : openResultOverlay(result.id, result.testType)
        }
      />,
    ],
  });

  const results = useFetchAllResultsByPatientId(
    currentUser,
    (data) => data.map(formatResultsView),
    null,
    patientId,
  );

  const latestResults = useFetchAllResultsByPatientId(
    currentUser,
    (data) => data.map(formatResultsView),
    resultsDataPagination.latestResults,
    patientId,
  );

  const unviewedResults = useFetchUnviewedResults(currentUser, (data) =>
    data.map(formatResultsView),
  );

  const latestUnviewedResults = useFetchUnviewedResults(
    currentUser,
    (data) => data.map(formatResultsView),
    resultsDataPagination.latestUnviewedResults,
  );

  return {
    results,
    latestResults,
    unviewedResults,
    latestUnviewedResults,
  };
};
