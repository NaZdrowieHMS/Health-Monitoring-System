import { LinkButton, PrimaryButton, UserButton } from "components/atoms";
import { PatientData, UserData } from "properties/types";

import {
  useFetchAllUnassignedPatients,
  useFetchPatients,
} from "services/doctorData";
import { useBindPatientToDoctor } from "services/patientData";
import { doctorDataPagination } from "services/utils";
import { useOverlay } from "../context";
import { useDesiredOverlay } from "../useDesiredOverlay";
import { useScreensNavigation } from "../useScreenNavigation";

export const useDoctorData = (currentUser: UserData) => {
  const { openPatientInfoOverlay } = useDesiredOverlay(currentUser);
  const { hideOverlay } = useOverlay();
  const bind = useBindPatientToDoctor(currentUser);

  const { navigateToPatientScreen } = useScreensNavigation();

  const formatPatientsView = (patient: PatientData) => ({
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
  });

  const prepareLatestPatients = () =>
    useFetchPatients(
      currentUser,
      (data) => data.map(formatPatientsView),
      doctorDataPagination.latestPatients,
    );

  const formatNewPatients = (patient: PatientData) => ({
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
  });

  const prepareUnassignedPatients = () =>
    useFetchAllUnassignedPatients(
      currentUser,
      (data) => data.map(formatNewPatients),
      doctorDataPagination.unassignedPatients,
    );

  const filteredUnassignedPatients = (
    unassignedPatients: ReturnType<typeof formatNewPatients>[],
    filterValue: string,
  ) => {
    return filterValue
      ? unassignedPatients?.filter((patientCard) => {
          return (
            patientCard.pesel.toString().includes(filterValue.toLowerCase()) ||
            patientCard.fullName
              .toLowerCase()
              .includes(filterValue.toLowerCase())
          );
        })
      : unassignedPatients;
  };

  return {
    prepareLatestPatients,
    prepareUnassignedPatients,
    filteredUnassignedPatients,
  };
};
