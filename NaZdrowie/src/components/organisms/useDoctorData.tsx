import { LinkButton, UserButton } from "components/atoms";
import { PatientData, PatientResult, UserData } from "properties/types";
import { useFetchHealthCommentsFiltered } from "services/commentsData";
import {
  useFetchAllUnassignedPatients,
  useFetchUnviewedResults,
  useFetchPatients,
} from "services/doctorData";
import { useBindPatientToDoctor } from "services/patientData";
import { CommentsFilter, formatCommentsData } from "services/utils";

import { useDesiredOverlay } from "./useDesiredOverlay";
import { latestCount } from "services/config";

export const useDoctorData = (
  navigation,
  currentUser: UserData,
  patientId?: number,
) => {
  const { openPatientInfoOverlay } = useDesiredOverlay(currentUser);
  const bind = useBindPatientToDoctor(currentUser);

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
  );

  const otherDotorsComments = useFetchHealthCommentsFiltered(
    currentUser,
    patientId,
    CommentsFilter.Others,
    (data) => data.map(formatCommentsData),
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
            openPatientInfoOverlay(patient, () =>
              bind.mutate({ doctorId: currentUser.id, patientId: patient.id }),
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

  return {
    navigateToNewPatientsScreen,
    navigateToPatientScreen,
    currentDotorComments,
    otherDotorsComments,
    latestPatients,
    unviewedResults,
    unassignedPatients,
    filteredUnassignedPatients,
  };
};
