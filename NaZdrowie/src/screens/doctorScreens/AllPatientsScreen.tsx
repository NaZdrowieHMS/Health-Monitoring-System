import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import { UserButton } from "components/atoms";
import { LoadingCard, Navbar } from "components/molecules";
import { UserContext } from "components/organisms/context";
import { generalStyle, mainStyle } from "properties/styles";
import { useContext } from "react";
import { ScrollView, SafeAreaView } from "react-native";
import { useFetchPatients } from "services/doctorData";

export const AllPatientsScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "AllPatients">) => {
  const { currentUser } = useContext(UserContext);

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
    navigation.navigate("PatientDetails", {
      patientId,
    });
  };

  return (
    <>
      <Navbar
        navigation={(path) => navigation.navigate(path)}
        navbarDescriptionTitle="Moi pacjenci"
      />
      <SafeAreaView style={generalStyle.safeArea}>
        <ScrollView contentContainerStyle={mainStyle.container}>
          {allPatients.isSuccess ? allPatients.data : <LoadingCard />}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
