import { LinkButton } from "components/atoms";
import {
  AiPrediction,
  HealthFormDisplayData,
  UserData,
} from "properties/types";
import {
  useAddAiSelectedResults,
  useDeleteAiSelectedResults,
  useFetchLatestHealthFormAnalysis,
  useAnalyzeNewHealthForm,
} from "services/aiData";
import {
  aiDataPagination,
  doctorKeys,
  formatDate,
  formatShortDate,
} from "services/utils";

import { useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
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
import { useFetchHealthForms } from "services/healthFormsData";
import { useDesiredOverlay } from "../useDesiredOverlay";
import { Alert } from "react-native";
import { UserContext } from "../context";

export const useAiData = (currentUser: UserData, patientId: number) => {
  const { setLatestHealthFormId } = useContext(UserContext);
  const queryClient = useQueryClient();
  const addAiSelectedResults = useAddAiSelectedResults();
  const deleteAiSelectedResults = useDeleteAiSelectedResults();
  const analyzeResultsWithAi = useAnalyzeResultsWithAi(currentUser, patientId);

  const { navigateToResultPreviewScreen } = useScreensNavigation();
  const { openHealthFormResultOverlay } = useDesiredOverlay(currentUser);
  const [predictHealthFormId, setPredictHealthFormId] = useState<number>(null);

  const analyzeNewHealthForm = useAnalyzeNewHealthForm(currentUser, patientId);

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

    if (selectedResults.length === 0 && !predictHealthFormId)
      Alert.alert("Proszę zaznczyć wyniki badań do wysłania");
    else if (selectedResults.length > 0)
      analyzeResultsWithAi.mutate({
        patientId: patientId,
        doctorId: currentUser.id,
        resultIds: selectedResults,
      });
    if (predictHealthFormId) {
      try {
        analyzeNewHealthForm.mutate(predictHealthFormId);
      } catch (error) {
        Alert.alert(
          "Wystąpił problem z przesłaniem formularza do analizy",
          "Wiadomość błędu: " + error.message,
        );
      }
    }
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

  const formatHealthFormView = (healthForm: HealthFormDisplayData) => ({
    text: `Formularz zdrowia ${formatShortDate(healthForm.createDate)}`,
    buttons: [
      <LinkButton
        key="view-health-form"
        title="Podgląd"
        handleOnClick={() => openHealthFormResultOverlay(healthForm)}
      />,
    ],
    checkbox: {
      checkboxStatus: false,
      checkboxHandler: (value: boolean) =>
        setPredictHealthFormId(value ? healthForm.id : null),
    },
  });

  const prepareLatestHealthFormForAi = () =>
    useFetchHealthForms(
      currentUser,
      (data) => {
        setLatestHealthFormId(data[0].id);
        return data.map(formatHealthFormView);
      },
      { pageSize: 1 },
      patientId,
    );

  const prepareLatestHealthFormReport = (healthFormId: number) =>
    useFetchLatestHealthFormAnalysis(currentUser, patientId, healthFormId);

  return {
    preparePatientResultsForAi,
    handleCheckboxForAiSelection,
    startAiDiagnosis,
    updateAiSelectedData,
    preparePatientLatestPrediction,
    prepareLatestHealthFormForAi,
    prepareLatestHealthFormReport,
  };
};
