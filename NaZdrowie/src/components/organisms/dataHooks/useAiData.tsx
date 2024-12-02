import { LinkButton } from "components/atoms";
import { AiPrediction, UserData } from "properties/types";
import {
  useAddAiSelectedResults,
  useDeleteAiSelectedResults,
} from "services/aiData";
import { aiDataPagination, doctorKeys, formatDate } from "services/utils";

import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useAnalyzeWithAi, useFetchPatientPredictions } from "services/aiData";
import {
  markPatientSpecificResultDataAsStale,
  useFetchAllResultsByPatientId,
} from "services/resultsData";
import {
  DetailedResult,
  ResultOverview,
} from "properties/types/api/ResultProps";
import { useScreensNavigation } from "../useScreenNavigation";

export const useAiData = (currentUser: UserData, patientId: number) => {
  const queryClient = useQueryClient();
  const addAiSelectedResults = useAddAiSelectedResults();
  const deleteAiSelectedResults = useDeleteAiSelectedResults();
  const analyzeWithAi = useAnalyzeWithAi(currentUser, patientId);
  const { navigateToResultPreviewScreen } = useScreensNavigation();

  const [refreshKey, setRefreshKey] = useState(0);

  const preparePatientResultsForAi = () =>
    useFetchAllResultsByPatientId(
      currentUser,
      (data) => data.map(formatResultsForAiData),
      aiDataPagination.patientResultsForAi,
      patientId,
    );

  function handleCheckboxForAiSelection(resultId: number, value: boolean) {
    let isTemporary = false;
    queryClient.setQueryData(
      doctorKeys.patient.results.specific(currentUser.id, patientId, resultId),
      (data: DetailedResult) => {
        if (data?.content === undefined) isTemporary = true;
        if (data === undefined) {
          return {
            resultId,
            aiSelected: value,
          };
        }
        return {
          ...data,
          aiSelected: value,
        };
      },
    );
    setRefreshKey((prev) => prev++);
    if (isTemporary)
      markPatientSpecificResultDataAsStale(
        queryClient,
        currentUser.id,
        patientId,
        resultId,
      );
  }

  function formatResultsForAiData(result: ResultOverview) {
    return {
      checkbox: {
        checkboxStatus: queryClient.getQueryData<DetailedResult>(
          doctorKeys.patient.results.specific(
            currentUser.id,
            patientId,
            result.id,
          ),
        ).aiSelected,
        checkboxHandler: (value: boolean) =>
          handleCheckboxForAiSelection(result.id, value),
      },
      text: result.testType,
      buttons: [
        <LinkButton
          title="Podgląd"
          handleOnClick={() =>
            navigateToResultPreviewScreen(
              result.id,
              result.patientId,
              result.testType,
            )
          }
        />,
      ],
    };
  }

  const updateAiSelectedData = () => {
    const selectedResults = getCurrentPatientResultDetails();
    if (selectedResults) {
      const toAdd = selectedResults.filter((elem) => elem.aiSelected);
      const toDelete = selectedResults.filter((elem) => !elem.aiSelected);
      addAiSelectedResults.mutateAsync(toAdd);
      deleteAiSelectedResults.mutateAsync(toDelete);
      // maybe verify whether it was succesfull, or make it optimal
    }
  };

  const startAiDiagnosis = () => {
    const results = getCurrentPatientResultDetails();

    const selectedResults = results
      .filter((elem) => elem.aiSelected === true)
      .map((elem) => elem.resultId);

    analyzeWithAi.mutate({
      patientId: patientId,
      doctorId: currentUser.id,
      resultIds: selectedResults,
    });
  };

  function formatPatientPredictions(prediction: AiPrediction) {
    return {
      status: prediction.status,
      sourceResults: prediction.resultIds, // TODO
      prediction: prediction.prediction,
      confidence: prediction.confidence,
      createdDate: formatDate(prediction.createdDate),
    };
  }

  const patientPredictions = useFetchPatientPredictions(
    currentUser,
    patientId,
    (data) => data.map(formatPatientPredictions),
    aiDataPagination.patientPredictions,
  );

  function getCurrentPatientResultDetails() {
    return queryClient
      .getQueriesData<DetailedResult>({
        predicate: (query) =>
          query.queryKey.length ===
            doctorKeys.patient.results.specific(currentUser.id, patientId, 0)
              .length &&
          doctorKeys.patient.results
            .core(currentUser.id, patientId)
            .every((elem) => query.queryKey.includes(elem)) &&
          typeof query.queryKey[3] === "number",
      })
      .map(([, data]) => ({
        resultId: data.id,
        aiSelected: data.aiSelected,
        patientId,
        doctorId: currentUser.id,
      }));
  }

  return {
    preparePatientResultsForAi,
    handleCheckboxForAiSelection,
    startAiDiagnosis,
    updateAiSelectedData,
    patientPredictions,
    refreshKey,
  };
};
