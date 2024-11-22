import { useNavigation } from "@react-navigation/native";
import { UserButton } from "components/atoms";
import { LoadingCard, Navbar } from "components/molecules";
import { UserContext } from "components/organisms/context";
import { generalStyle, mainStyle } from "properties/styles";
import { StringNavigation } from "properties/types";
import { useContext } from "react";
import { ScrollView, SafeAreaView } from "react-native";
import { useFetchPatients } from "services/doctorData";

export const AllPatientsScreen = () => {
  const { currentUser } = useContext(UserContext);
  const { navigate } = useNavigation<StringNavigation>();
  const allPatients = useFetchPatients(currentUser, (data) => {
    return data.map((patient) => (
      <UserButton
        key={patient.id}
        title={`${patient.name} ${patient.surname}`}
        handleOnClick={() => navigateToPatientScreen(patient.id)}
      />
    ));
  });

  const navigateToPatientScreen = (patientId: number) => {
    navigate("PatientDetails", {
      patientId,
    });
  };

  return (
    <>
      <Navbar navbarDescriptionTitle="Moi pacjenci" />
      <SafeAreaView style={generalStyle.safeArea}>
        <ScrollView contentContainerStyle={mainStyle.container}>
          {allPatients.isSuccess ? allPatients.data : <LoadingCard />}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
