import { LinkButton } from "components/atoms";
import { UserData } from "properties/types";

import { useDesiredOverlay } from "../useDesiredOverlay";
import { ResultOverview } from "properties/types/api/ResultProps";
import {
  useFetchAllResultsByPatientId,
  useFetchUnviewedResults,
} from "services/resultsData";
import {
  formatDate,
  formatShortDate,
  resultsDataPagination,
} from "services/utils";
import { useScreensNavigation } from "../useScreenNavigation";
import { ResultButton } from "components/atoms/buttons";

export const useResultsData = (currentUser: UserData, patientId?: number) => {
  const { openResultOverlay } = useDesiredOverlay(currentUser);
  const { navigateToResultPreviewScreen } = useScreensNavigation();

  const formatResultsView = (result: ResultOverview) => ({
    text: result.testType + " " + formatShortDate(result.createdDate),
    buttons: [
      <LinkButton
        title="Podgląd"
        handleOnClick={() =>
          currentUser.isDoctor
            ? navigateToResultPreviewScreen(
                result.id,
                result.patientId,
                result.testType + " " + formatDate(result.createdDate),
              )
            : openResultOverlay(
                result.id,
                result.testType + " " + formatDate(result.createdDate),
              )
        }
      />,
    ],
  });

  const formatResultButton = (result: ResultOverview) => {
    const title = result.testType + " " + formatShortDate(result.createdDate);
    return (
      <ResultButton
        title={result.testType}
        date={result.createdDate}
        key={result.id}
        handleOnClick={
          currentUser.isDoctor
            ? () =>
                navigateToResultPreviewScreen(
                  result.id,
                  result.patientId,
                  title,
                )
            : () => openResultOverlay(result.id, title)
        }
      />
    );
  };

  const prepareResults = () =>
    useFetchAllResultsByPatientId(
      currentUser,
      (data) => data.map(formatResultsView),
      null,
      patientId,
    );

  const prepareLatestResults = () =>
    useFetchAllResultsByPatientId(
      currentUser,
      (data) => data.map(formatResultsView),
      resultsDataPagination.latestResults,
      patientId,
    );

  const prepareResultsHistory = () =>
    useFetchAllResultsByPatientId(
      currentUser,
      (data) => data.map(formatResultButton),
      null,
      patientId,
    );

  const prepareUnviewedResults = () =>
    useFetchUnviewedResults(currentUser, (data) => data.map(formatResultsView));

  const prepareLatestUnviewedResults = () =>
    useFetchUnviewedResults(
      currentUser,
      (data) => data.map(formatResultsView),
      resultsDataPagination.latestUnviewedResults,
    );

  return {
    prepareResults,
    prepareLatestResults,
    prepareUnviewedResults,
    prepareLatestUnviewedResults,
    prepareResultsHistory,
  };
};
