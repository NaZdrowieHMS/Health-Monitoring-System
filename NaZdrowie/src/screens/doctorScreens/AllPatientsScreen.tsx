import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import { UserButton } from "components/atoms";
import { LoadingCard, Navbar } from "components/molecules";
import { UserContext } from "components/organisms/context";
import { mainStyle } from "properties/styles";
import { useContext } from "react";
import { View, ScrollView } from "react-native";
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
    <View style={{ flex: 1 }}>
      <Navbar navigation={(path) => navigation.navigate(path)} navbarDescriptionTitle="Moi pacjenci" />
      <ScrollView contentContainerStyle={mainStyle.container}>
        {allPatients.isSuccess ? allPatients.data : <LoadingCard />}
      </ScrollView>
    </View>
  );
};
