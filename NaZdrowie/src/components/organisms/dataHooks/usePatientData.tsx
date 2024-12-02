import { UserButton } from "components/atoms";
import { UserData } from "properties/types";
import { useFetchPatients } from "services/doctorData";
import { useFetchPatient } from "services/patientData";
import { useScreensNavigation } from "../useScreenNavigation";

export const usePatientData = (currentUser: UserData, patientId?: number) => {
  const preparePatientData = () =>
    useFetchPatient(currentUser, null, patientId);

  const { navigateToPatientScreen } = useScreensNavigation();

  const prepareAllPatients = () =>
    useFetchPatients(currentUser, (data) => {
      return data.map((patient) => (
        <UserButton
          key={patient.id}
          title={`${patient.name} ${patient.surname}`}
          handleOnClick={() => navigateToPatientScreen(patient.id)}
        />
      ));
    });

  return {
    preparePatientData,
    prepareAllPatients,
  };
};
