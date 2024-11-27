import { LinkButton } from "components/atoms";
import { UserData } from "properties/types";

import { useDesiredOverlay } from "../useDesiredOverlay";
import { ResultOverview } from "properties/types/api/ResultProps";
import {
  useFetchAllResultsByPatientId,
  useFetchUnviewedResults,
} from "services/resultsData";
import { resultsDataPagination } from "services/utils";
import { useScreensNavigation } from "../useScreenNavigation";

export const useResultsData = (currentUser: UserData, patientId?: number) => {
  const { openResultOverlay } = useDesiredOverlay(currentUser);
  const { navigateToResultPreviewScreen } = useScreensNavigation();

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
                result.testType
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
    patientId
  );

  const latestResults = useFetchAllResultsByPatientId(
    currentUser,
    (data) => data.map(formatResultsView),
    resultsDataPagination.latestResults,
    patientId
  );

  const unviewedResults = useFetchUnviewedResults(currentUser, (data) =>
    data.map(formatResultsView)
  );

  const latestUnviewedResults = useFetchUnviewedResults(
    currentUser,
    (data) => data.map(formatResultsView),
    resultsDataPagination.latestUnviewedResults
  );

  return {
    results,
    latestResults,
    unviewedResults,
    latestUnviewedResults,
  };
};
