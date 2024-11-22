import { LinkButton } from "components/atoms";
import { UserData } from "properties/types";
import { latestCount } from "services/config";

import { useDesiredOverlay } from "./useDesiredOverlay";
import { ResultOverview } from "properties/types/api/ResultProps";
import {
  useFetchAllResultsByPatientId,
  useFetchUnviewedResults,
} from "services/resultsData";

export const useResultsData = (
  navigation,
  currentUser: UserData,
  patientId?: number,
) => {
  const { openResultOverlay } = useDesiredOverlay(currentUser);

  const navigateToResultPreviewScreen = (
    resultId: number,
    patientId: number,
    resultTitle: string,
  ) => {
    navigation.navigate("ResultPreview", {
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
    patientId,
  );

  const latestResults = useFetchAllResultsByPatientId(
    currentUser,
    (data) => data.map(formatResultsView),
    patientId,
    latestCount,
  );

  const unviewedResults = useFetchUnviewedResults(currentUser, (data) =>
    data.map(formatResultsView),
  );

  const latestUnviewedResults = useFetchUnviewedResults(
    currentUser,
    (data) => data.map(formatResultsView),
    latestCount,
  );

  return {
    results,
    latestResults,
    unviewedResults,
    latestUnviewedResults,
  };
};
