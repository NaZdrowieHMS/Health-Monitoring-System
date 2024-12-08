import { LinkButton } from "components/atoms";
import { AiPrediction, UserData } from "properties/types";
import {
  useAddAiSelectedResults,
  useDeleteAiSelectedResults,
} from "services/aiData";
import { aiDataPagination, doctorKeys, formatShortDate } from "services/utils";

import { useQueryClient } from "@tanstack/react-query";
import {
  useAnalyzeResultsWithAi,
  useFetchPatientPredictions,
} from "services/aiData";
import {
  markPatientSpecificResultDataAsStale,
  useFetchAllResultsByPatientId,
} from "services/resultsData";
import {
  DetailedResult,
  ResultOverview,
} from "properties/types/api/ResultProps";
import { useScreensNavigation } from "../useScreenNavigation";
import { Alert } from "react-native";

export const useAiData = (currentUser: UserData, patientId: number) => {
  const queryClient = useQueryClient();
  const addAiSelectedResults = useAddAiSelectedResults();
  const deleteAiSelectedResults = useDeleteAiSelectedResults();
  const analyzeResultsWithAi = useAnalyzeResultsWithAi(currentUser, patientId);

  const { navigateToResultPreviewScreen } = useScreensNavigation();

  const handleCheckboxForAiSelection = (resultId: number, value: boolean) => {
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
    if (isTemporary)
      markPatientSpecificResultDataAsStale(
        queryClient,
        currentUser.id,
        patientId,
        resultId,
      );
  };

  const formatResultsForAiData = (result: ResultOverview) => {
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
      text: `${result.testType} ${formatShortDate(result.createdDate)}`,
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
  };

  const preparePatientResultsForAi = () =>
    useFetchAllResultsByPatientId(
      currentUser,
      (data) => data.map(formatResultsForAiData),
      aiDataPagination.patientResultsForAi,
      patientId,
    );

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

    if (selectedResults.length === 0)
      Alert.alert("Proszę zaznczyć wyniki badań do wysłania");
    else if (selectedResults.length > 0)
      analyzeResultsWithAi.mutate({
        patientId,
        doctorId: currentUser.id,
        resultIds: selectedResults,
      });
  };

  const formatPatientPredictions = (prediction: AiPrediction) => {
    return {
      status: prediction.status,
      prediction: prediction.resultAiAnalysis?.prediction,
      confidence: prediction.resultAiAnalysis?.confidence,
      sourceResults: prediction.resultAiAnalysis?.results.map(
        (result, iter) => (
          <LinkButton
            key={iter}
            title={`${result.testType} ${formatShortDate(result.createdDate)}`}
            handleOnClick={() =>
              navigateToResultPreviewScreen(
                result.resultId,
                patientId,
                result.testType,
              )
            }
          />
        ),
      ),
      predictionDate: formatShortDate(prediction.createdDate),
      diagnoses: prediction.formAiAnalysis?.diagnoses,
      recommendations: prediction.formAiAnalysis?.recommendations,
      healthFormDate: prediction.formAiAnalysis?.formCreatedDate
        ? formatShortDate(prediction.formAiAnalysis?.formCreatedDate)
        : "",
    };
  };

  const preparePatientLatestPrediction = () =>
    useFetchPatientPredictions(
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
    preparePatientLatestPrediction,
  };
};
