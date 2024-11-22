import { LinkButton, PrimaryButton, UserButton } from "components/atoms";
import { PatientData, StringNavigation, UserData } from "properties/types";
import {
  useFetchHealthCommentsFiltered,
  useSendHealthComment,
} from "services/commentsData";
import { currentDoctorCommentsCount, latestCount } from "services/config";
import {
  useFetchAllUnassignedPatients,
  useFetchPatients,
} from "services/doctorData";
import { useBindPatientToDoctor } from "services/patientData";
import { CommentsFilter, formatCommentsData } from "services/utils";

import { useOverlay } from "./context";
import { useDesiredOverlay } from "./useDesiredOverlay";
import { useNavigation } from "@react-navigation/native";

export const useDoctorData = (currentUser: UserData, patientId?: number) => {
  const { openPatientInfoOverlay } = useDesiredOverlay(currentUser);
  const { hideOverlay } = useOverlay();
  const bind = useBindPatientToDoctor(currentUser);
  const { navigate } = useNavigation<StringNavigation>();
  const healthCommentUpload = {
    sendComment: useSendHealthComment(currentUser),
    comment: {
      doctorId: currentUser.id,
      patientId: patientId,
      content: "",
    },
  };

  const navigateToPatientScreen = (patientId: number) => {
    navigate("PatientDetails", {
      patientId,
    });
  };

  const navigateToNewPatientsScreen = () => {
    navigate("NewPatients");
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

  const latestPatients = useFetchPatients(
    currentUser,
    (data) => data.map(formatPatientsView),
    latestCount,
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

  return {
    navigateToNewPatientsScreen,
    navigateToPatientScreen,
    currentDotorComments,
    otherDotorsComments,
    latestPatients,
    unassignedPatients,
    filteredUnassignedPatients,
    healthCommentUpload,
  };
};
