import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LoadingCard, Navbar } from "components/molecules";
import { SafeAreaView, ScrollView } from "react-native";
import { generalStyle, mainStyle } from "properties/styles";
import { useContext } from "react";
import { UserContext } from "components/organisms/context";
import { useFetchPatient } from "services/patientData";
import { useDesiredOverlay, useScreensNavigation } from "components/organisms";
import { useFetchAllResultsByPatientId } from "services/resultsData";
import { ResultButton } from "components/atoms/buttons";
import { ResultOverview } from "properties/types/api";
import { RootStackParamList } from "App";

export const AllResultsScreen = ({
  route,
}: NativeStackScreenProps<RootStackParamList, "AllResults">) => {
  const { currentUser } = useContext(UserContext);
  const { patientId } = route.params;
  const results = useFetchAllResultsByPatientId({
    id: patientId,
    isDoctor: false,
  });
  const patient = useFetchPatient(currentUser, null, patientId);
  const { openResultOverlay } = useDesiredOverlay(currentUser);
  const { navigateToResultPreviewScreen } = useScreensNavigation();

  const formatResultButton = (result: ResultOverview) => {
    return (
      <ResultButton
        title={result.testType}
        date={result.createdDate}
        key={result.id}
        handleOnClick={
          currentUser.isDoctor
            ? () =>
                navigateToResultPreviewScreen(
                  result.id,
                  result.patientId,
                  result.testType,
                )
            : () => openResultOverlay(result.id, result.testType)
        }
      />
    );
  };

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
          {results.isSuccess ? (
            results.data.map(formatResultButton)
          ) : (
            <LoadingCard />
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
