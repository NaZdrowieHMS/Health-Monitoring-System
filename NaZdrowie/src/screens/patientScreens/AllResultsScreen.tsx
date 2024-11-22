import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import { LoadingCard, Navbar } from "components/molecules";
import { SafeAreaView, ScrollView } from "react-native";
import { generalStyle, mainStyle } from "properties/styles";
import { useContext } from "react";
import { UserContext } from "components/organisms/context";
import { useFetchPatient } from "services/patientData";
import { ResultButton } from "components/atoms/buttons/ResultButton";
import { useDesiredOverlay } from "components/organisms";
import { useFetchAllResultsByPatientId } from "services/resultsData";
import { useNavigation } from "@react-navigation/native";
import { StringNavigation } from "properties/types";

export const AllResultsScreen = ({
  route,
}: NativeStackScreenProps<RootStackParamList, "AllResults">) => {
  const { currentUser } = useContext(UserContext);
  const { patientId } = route.params;
  const results = useFetchAllResultsByPatientId({
    id: patientId,
    isDoctor: false,
  });
  const { navigate } = useNavigation<StringNavigation>();
  const patient = useFetchPatient(currentUser, null, patientId);
  const { openResultOverlay } = useDesiredOverlay(currentUser);
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
            results.data.map((result) => (
              <ResultButton
                title={result.testType}
                date={result.createdDate}
                key={result.id}
                handleOnClick={
                  currentUser.isDoctor
                    ? () =>
                        navigate("ResultPreview", {
                          resultId: result.id,
                          patientId,
                          resultTitle: result.testType,
                        })
                    : () => openResultOverlay(result.id, result.testType)
                }
              />
            ))
          ) : (
            <LoadingCard />
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
