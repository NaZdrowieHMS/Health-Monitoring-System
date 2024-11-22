import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import { LoadingCard, Navbar } from "components/molecules";
import { SafeAreaView, ScrollView } from "react-native";
import { generalStyle, mainStyle } from "properties/styles";
import React, { useContext } from "react";
import { UserContext } from "components/organisms/context";
import { useFetchPatient } from "services/patientData";
import { ResultButton } from "components/atoms/buttons/ResultButton";
import { useDesiredOverlay } from "components/organisms";
import { useFetchAllResultsByPatientId } from "services/resultsData";

export const AllResultsScreen = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, "AllResults">) => {
  const { currentUser } = useContext(UserContext);
  const { patientId } = route.params;
  const results = useFetchAllResultsByPatientId({
    id: patientId,
    isDoctor: false,
  });
  const patient = useFetchPatient(currentUser, null, patientId);
  const { openResultOverlay } = useDesiredOverlay(currentUser);
  return (
    <>
      {results.isSuccess && currentUser.isDoctor ? (
        <Navbar
          navigation={(path) => navigation.navigate(path)}
          navbarDescriptionTitle={`${patient.data.name} ${patient.data.surname}`}
          navbarDescriptionSubtitle="Historia wyników"
        />
      ) : results.isSuccess && !currentUser.isDoctor ? (
        <Navbar
          navigation={(path) => navigation.navigate(path)}
          navbarDescriptionTitle="Historia wyników"
        />
      ) : (
        <Navbar
          navigation={(path) => navigation.navigate(path)}
          navbarDescriptionTitle="..."
        />
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
                        navigation.navigate("ResultPreview", {
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
