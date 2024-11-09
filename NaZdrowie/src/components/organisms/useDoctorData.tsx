import { LinkButton } from "components/atoms";
import { PatientData, PatientResult, UserData } from "properties/types";
import {
  useFetchLatestPatients,
  useFetchLatestResults,
} from "services/doctorData";
import { useFetchHealthComments } from "services/patientData";
import { formatCommentsData } from "services/utils";

export const useDoctorData = (
  navigation,
  currentUser: UserData,
  patientId?: number,
) => {
  const navigateToPatientScreen = (patientId: number) => {
    navigation.navigate("PatientDetails", {
      patientId,
    });
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

  return {
    currentDotorComments,
    otherDotorsComments,
    latestPatients,
    latestResults,
  };
};
