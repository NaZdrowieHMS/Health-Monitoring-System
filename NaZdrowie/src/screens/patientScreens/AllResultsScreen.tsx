import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Navbar } from "components/molecules";
import { SafeAreaView, ScrollView } from "react-native";
import { generalStyle, mainStyle } from "properties/styles";
import { useContext } from "react";
import { UserContext } from "components/organisms/context";
import { useFetchPatient } from "services/patientData";
import { RootStackParamList } from "App";
import { useResultsData } from "components/organisms/dataHooks";
import { QueryWrapper } from "components/organisms";
import Toast from "react-native-toast-message";
import React from "react";

export const AllResultsScreen = ({
  route,
}: NativeStackScreenProps<RootStackParamList, "AllResults">) => {
  const { currentUser } = useContext(UserContext);
  const { patientId } = route.params;
  const { prepareResultsHistory } = useResultsData(currentUser, patientId);
  const resultsQuery = prepareResultsHistory();
  const patientQuery = useFetchPatient(currentUser, null, patientId);

  return (
    <>
      {currentUser.isDoctor ? (
        <QueryWrapper
          queries={[patientQuery]}
          renderSuccess={([patient]) => (
            <Navbar
              navbarDescriptionTitle={`${patient.name} ${patient.surname}`}
              navbarDescriptionSubtitle="Historia wyników"
            />
          )}
          renderLoading={() => <Navbar navbarDescriptionTitle="..." />}
          renderError={(errors) => {
            Toast.show({
              type: "error",
              text1: "Błąd w pobieraniu informacji o pacjencie",
              text2: errors.join(", "),
            });
            return <Navbar navbarDescriptionTitle="..." />;
          }}
        />
      ) : (
        <Navbar navbarDescriptionTitle="Historia wyników" />
      )}
      <SafeAreaView style={generalStyle.safeArea}>
        <ScrollView contentContainerStyle={mainStyle.container}>
          <QueryWrapper
            queries={[resultsQuery]}
            renderSuccess={([results]) => <>{results}</>}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
