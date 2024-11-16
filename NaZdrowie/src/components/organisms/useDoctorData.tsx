import { LinkButton, PrimaryButton, UserButton } from "components/atoms";
import { PatientData, PatientResult, UserData } from "properties/types";
import { useFetchHealthComments } from "services/commentsData";
import {
  useFetchAllUnassignedPatients,
  useFetchLatestPatients,
  useFetchLatestResults,
} from "services/doctorData";
import { useBindPatientToDoctor } from "services/patientData";
import { formatCommentsData } from "services/utils";

import { useOverlay } from "./context";
import { useDesiredOverlay } from "./useDesiredOverlay";

export const useDoctorData = (
  navigation,
  currentUser: UserData,
  patientId?: number,
) => {
  const { openPatientInfoOverlay } = useDesiredOverlay(currentUser);
  const { hideOverlay } = useOverlay();
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

  const latestPatients = useFetchLatestPatients(currentUser, (data) =>
    data.map(formatPatientsView),
  );

  const latestResults = useFetchLatestResults(currentUser, (data) =>
    data.map(formatResultEntry),
  );

  const currentDotorComments = useFetchHealthComments(
    currentUser,
    (data) => {
      return data
        .filter((comment) => comment.doctor.id === currentUser.id)
        .map(formatCommentsData);
    },
    patientId,
  );

  const otherDotorsComments = useFetchHealthComments(
    currentUser,
    (data) => {
      return data
        .filter((comment) => comment.doctor.id !== currentUser.id)
        .map(formatCommentsData);
    },
    patientId,
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
    (data) => {
      return data.map(formatNewPatients);
    },
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
    latestResults,
    unassignedPatients,
    filteredUnassignedPatients,
  };
};
