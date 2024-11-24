import { LinkButton } from "components/atoms";
import { AiPrediction, UserData } from "properties/types";
import {
  useAddAiSelectedResults,
  useDeleteAiSelectedResults,
} from "services/doctorData";
import { formatDate } from "services/utils";

import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useAnalyzeWithAi, useFetchPatientPredictions } from "services/aiData";
import { useFetchAllResultsByPatientId } from "services/resultsData";
import { ResultOverview } from "properties/types/api/ResultProps";

export const useAiData = (currentUser: UserData, patientId: number) => {
  const queryClient = useQueryClient();
  const addAiSelectedResults = useAddAiSelectedResults();
  const deleteAiSelectedResults = useDeleteAiSelectedResults();
  const analyzeWithAi = useAnalyzeWithAi(currentUser, patientId);

  const patientResultsForAi = useFetchAllResultsByPatientId(
    currentUser,
    (data) => data.map(formatResultsForAiData),
    null,
    patientId,
  );

  function handleCheckboxForAiSelection(resultId: number) {
    queryClient.setQueryData(
      [currentUser, patientId, "results", ""],
      (data: ResultOverview[]) => {
        return data.map((dataResult: ResultOverview) => {
          if (dataResult.id === resultId) {
            return {
              ...dataResult,
              aiSelected: !dataResult.aiSelected,
            };
          } else {
            return dataResult;
          }
        });
      },
    );
  }

  function formatResultsForAiData(result: ResultOverview) {
    return {
      checkbox: {
        checkboxStatus: result.aiSelected,
        checkboxHandler: () => handleCheckboxForAiSelection(result.id),
      },
      text: result.testType,
      buttons: [<LinkButton title="Podgląd" />],
    };
  }

  const updateAiSelectedData = useCallback(() => {
    return () => {
      const selectedResults = queryClient.getQueryData<ResultOverview[]>([
        currentUser,
        patientId,
        "results",
        "",
      ]);
      if (selectedResults) {
        const toAdd = selectedResults
          .filter(
            (result) =>
              result.aiSelected === true && result.patientId === patientId,
          )
          .map((result) => ({
            resultId: result.id,
            patientId: patientId,
            doctorId: currentUser.id,
          }));
        const toDelete = selectedResults
          .filter(
            (result) =>
              result.aiSelected === false && result.patientId === patientId,
          )
          .map((result) => ({
            resultId: result.id,
            patientId: patientId,
            doctorId: currentUser.id,
          }));
        addAiSelectedResults.mutateAsync(toAdd);
        deleteAiSelectedResults.mutateAsync(toDelete);
        // maybe verify whether it was succesfull
      }
    };
  }, []);

  const startAiDiagnosis = () => {
    const results = queryClient.getQueryData<ResultOverview[]>([
      currentUser,
      patientId,
      "results",
      "",
    ]);

    const selectedResults = results
      ? results
          .filter((result) => {
            return result.aiSelected === true && patientId === result.patientId;
          })
          .map((result) => result.id)
      : [];
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
  );

  return {
    patientResultsForAi,
    handleCheckboxForAiSelection,
    startAiDiagnosis,
    updateAiSelectedData,
    patientPredictions,
  };
};
