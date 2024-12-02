import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LoadingCard, Navbar } from "components/molecules";
import { SafeAreaView, ScrollView } from "react-native";
import { generalStyle, mainStyle } from "properties/styles";
import { useContext } from "react";
import { UserContext } from "components/organisms/context";
import { useFetchPatient } from "services/patientData";
import { RootStackParamList } from "App";
import { useResultsData } from "components/organisms/dataHooks";

export const AllResultsScreen = ({
  route,
}: NativeStackScreenProps<RootStackParamList, "AllResults">) => {
  const { currentUser } = useContext(UserContext);
  const { patientId } = route.params;
  const { prepareResultsHistory } = useResultsData(currentUser, patientId);
  const results = prepareResultsHistory();
  const patient = useFetchPatient(currentUser, null, patientId);

  return (
    <>
      {results.isSuccess && currentUser.isDoctor ? (
        <Navbar
          navbarDescriptionTitle={`${patient.data.name} ${patient.data.surname}`}
          navbarDescriptionSubtitle="Historia wyników"
        />
      ) : results.isSuccess && !currentUser.isDoctor ? (
        <Navbar navbarDescriptionTitle="Historia wyników" />
      ) : (
        <Navbar navbarDescriptionTitle="..." />
      )}
      <SafeAreaView style={generalStyle.safeArea}>
        <ScrollView contentContainerStyle={mainStyle.container}>
          {results.isSuccess ? results.data : <LoadingCard />}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
