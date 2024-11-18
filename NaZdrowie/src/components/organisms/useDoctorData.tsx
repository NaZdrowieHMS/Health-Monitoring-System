import { LinkButton, PrimaryButton, UserButton } from "components/atoms";
import { PatientData, PatientResult, UserData } from "properties/types";
import { useFetchHealthCommentsFiltered } from "services/commentsData";
import { currentDoctorCommentsCount, latestCount } from "services/config";
import {
  useFetchAllUnassignedPatients,
  useFetchUnviewedResults,
  useFetchPatients,
  useFetchPatientResults,
  useAddAiSelectedResults,
  useDeleteAiSelectedResults,
} from "services/doctorData";
import { useBindPatientToDoctor } from "services/patientData";
import { CommentsFilter, formatCommentsData } from "services/utils";

import { useOverlay } from "./context";
import { useDesiredOverlay } from "./useDesiredOverlay";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export const useDoctorData = (
  navigation,
  currentUser: UserData,
  patientId?: number,
) => {
  const { openPatientInfoOverlay } = useDesiredOverlay(currentUser);
  const queryClient = useQueryClient();
  const { hideOverlay } = useOverlay();
  const bind = useBindPatientToDoctor(currentUser);
  const addAiSelectedResults = useAddAiSelectedResults();
  const deleteAiSelectedResults = useDeleteAiSelectedResults();

  const navigateToPatientScreen = (patientId: number) => {
    navigation.navigate("PatientDetails", {
      patientId,
    });
  };

  const navigateToNewPatientsScreen = () => {
    navigation.navigate("NewPatients");
  };

  function formatPatientsView(patient: PatientData) {
    return {
      text: `${patient.name} ${patient.surname}`,
      buttons: [
        <LinkButton
          key={patient.id}
          title="Przejdź"
          handleOnClick={() => {
            navigateToPatientScreen(patient.id);
          }}
        />,
      ],
    };
  }

  function formatResultEntry(
    entry: PatientResult & {
      patient: PatientData;
    },
  ) {
    return {
      text: `${entry.patient.name}: ${entry.testType}`,
      buttons: [<LinkButton key={entry.id} title="Podgląd" />],
    };
  }

  const latestPatients = useFetchPatients(
    currentUser,
    (data) => data.map(formatPatientsView),
    latestCount,
  );

  const unviewedResults = useFetchUnviewedResults(currentUser, (data) =>
    data.map(formatResultEntry),
  );

  const currentDotorComments = useFetchHealthCommentsFiltered(
    currentUser,
    patientId,
    CommentsFilter.Specific,
    (data) => data.map(formatCommentsData),
    currentDoctorCommentsCount,
  );

  const otherDotorsComments = useFetchHealthCommentsFiltered(
    currentUser,
    patientId,
    CommentsFilter.Others,
    (data) => data.map(formatCommentsData),
    latestCount - currentDoctorCommentsCount,
  );

  function formatNewPatients(patient: PatientData) {
    return {
      pesel: Number(patient.pesel),
      fullName: `${patient.name} ${patient.surname}`,
      button: (
        <UserButton
          key={patient.id}
          title={`${patient.name} ${patient.surname}`}
          handleOnClick={() =>
            openPatientInfoOverlay(
              patient,
              <PrimaryButton
                title="Dodaj pacjenta"
                handleOnClick={() => {
                  bind.mutate({
                    doctorId: currentUser.id,
                    patientId: patient.id,
                  });
                  hideOverlay();
                }}
              />,
            )
          }
        />
      ),
    };
  }

  const unassignedPatients = useFetchAllUnassignedPatients(
    currentUser,
    (data) => data.map(formatNewPatients),
  );

  const filteredUnassignedPatients = (filterValue: string) => {
    return filterValue
      ? unassignedPatients.data?.filter((patientCard) => {
          return (
            patientCard.pesel.toString().includes(filterValue.toLowerCase()) ||
            patientCard.fullName
              .toLowerCase()
              .includes(filterValue.toLowerCase())
          );
        })
      : unassignedPatients.data;
  };

  const navigateToResultPreviewScreen = (
    result: PatientResult,
    patientId: number,
  ) => {
    navigation.navigate("ResultPreview", {
      result,
      patientId,
    });
  };

  const formatResultsView = (result: PatientResult) => ({
    text: result.testType,
    buttons: [
      <LinkButton
        title="Podgląd"
        handleOnClick={() => navigateToResultPreviewScreen(
          result,
          patientId ? patientId : currentUser.id,
        )}
      />,
    ],
  });

  const latestPatientResults = useFetchPatientResults(
    currentUser,
    patientId,
    (data) => data.map(formatResultsView),
    latestCount,
  );

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
  const startAiDiagnosis = () => {
    // keys needs to be changed :)
    const selectedResults = queryClient.getQueryData<PatientResult[]>([currentUser, patientId, "results", ""]) 
      .filter((result) => result.ai_selected === true)
      .map((result) => result.id)
    console.log(selectedResults)
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
  
  return {
    navigateToNewPatientsScreen,
    navigateToPatientScreen,
    currentDotorComments,
    otherDotorsComments,
    latestPatients,
    unviewedResults,
    latestPatientResults,
    patientResultsForAi,
    handleCheckboxForAiSelection,
    unassignedPatients,
    filteredUnassignedPatients,
    startAiDiagnosis,
    updateAiSelectedData,
  };
};
