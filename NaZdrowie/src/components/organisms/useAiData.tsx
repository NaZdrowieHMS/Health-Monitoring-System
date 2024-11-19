import { LinkButton } from "components/atoms";
import { AiPrediction, PatientResult, UserData } from "properties/types";
import {
  useFetchPatientResults,
  useAddAiSelectedResults,
  useDeleteAiSelectedResults,
} from "services/doctorData";
import { formatDate } from "services/utils";

import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useAnalyzeWithAi, useFetchPatientPredictions } from "services/aiData";

export const useAiData = (
  currentUser: UserData,
  patientId: number,
) => {
  const queryClient = useQueryClient();
  const addAiSelectedResults = useAddAiSelectedResults();
  const deleteAiSelectedResults = useDeleteAiSelectedResults();
  const analyzeWithAi = useAnalyzeWithAi(currentUser, patientId)

  const patientResultsForAi = useFetchPatientResults(
    currentUser,
    patientId,
    (data) => data.map(formatResultsForAiData),
  );

  function handleCheckboxForAiSelection(resultId: number) {
    queryClient.setQueryData(
      [currentUser, patientId, "results", ""], // keys needs to be changed :)
      (data: PatientResult[]) => {
        return data.map((dataResult: PatientResult) => {
          if (dataResult.id === resultId) {
            return {
              ...dataResult,
              ai_selected: !dataResult.ai_selected,
            };
          } else {
            return dataResult;
          }
        })},
    );
  }

  function formatResultsForAiData(result: PatientResult) {
    return {
      checkbox: {
        checkboxStatus: result.ai_selected,
        checkboxHandler: () => handleCheckboxForAiSelection(result.id),
      },
      text: result.testType,
      buttons: [<LinkButton title="Podgląd" />],
    };
  }

  const updateAiSelectedData = useCallback(() => {
    return () => {
      const selectedResults = queryClient.getQueryData<PatientResult[]>([currentUser, patientId, "results", ""]) 
      const toAdd = selectedResults.filter((result) => result.ai_selected === true).map((result) => ({
        resultId: result.id,
        patientId: patientId,
        doctorId: currentUser.id
      }))
      const toDelete = selectedResults.filter((result) => result.ai_selected === false).map((result) => ({
        resultId: result.id,
        patientId: patientId,
        doctorId: currentUser.id
      }))
      addAiSelectedResults.mutateAsync(toAdd)
      deleteAiSelectedResults.mutateAsync(toDelete)
      // maybe verify whether it was succesfull
    };
  }, [])

  const startAiDiagnosis = () => {
    // keys needs to be changed :)
    const selectedResults = queryClient.getQueryData<PatientResult[]>([currentUser, patientId, "results", ""]) 
      .filter((result) => result.ai_selected === true)
      .map((result) => result.id)
    analyzeWithAi.mutate({
      patientId: patientId,
      doctorId: currentUser.id,
      resultIds: selectedResults
    })
  }

  function formatPatientPredictions(prediction:AiPrediction) {
    return {
      status: prediction.status,
      sourceResults: prediction.resultIds, // TODO
      prediction: prediction.prediction,
      confidence: prediction.confidence,
      createdDate: formatDate(prediction.createdDate)
    }
  }

  const patientPredictions = useFetchPatientPredictions(currentUser, patientId, (data) => data.map(formatPatientPredictions))

  return {
    patientResultsForAi,
    handleCheckboxForAiSelection,
    startAiDiagnosis,
    updateAiSelectedData,
    patientPredictions,
  };
};
