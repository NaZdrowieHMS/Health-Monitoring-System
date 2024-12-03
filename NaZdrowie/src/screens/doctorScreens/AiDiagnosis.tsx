import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import { PrimaryButton } from "components/atoms";
import {
  AiAnalysisHealthFormCard,
  AiAnalysisResultCard,
  ListCard,
  LoadingCard,
  Navbar,
} from "components/molecules";
import { UserContext } from "components/organisms/context";
import { useAiData, usePatientData } from "components/organisms/dataHooks";
import { generalStyle, mainStyle } from "properties/styles";
import React, { useCallback, useContext } from "react";
import { ScrollView, SafeAreaView, Text } from "react-native";

export const AiDiagnosis = ({
  route,
}: NativeStackScreenProps<RootStackParamList, "AiDiagnosis">) => {
  const { patientId } = route.params;
  const { currentUser, latestHealthFormId } = useContext(UserContext);
  const { preparePatientData } = usePatientData(currentUser, patientId);
  const {
    preparePatientResultsForAi,
    startAiDiagnosis,
    updateAiSelectedData,
    preparePatientLatestPrediction,
    prepareLatestHealthFormForAi,
    prepareLatestHealthFormReport,
  } = useAiData(currentUser, patientId);

  const patientData = preparePatientData();
  const patientResultsForAi = preparePatientResultsForAi();
  const latestHealthForm = prepareLatestHealthFormForAi();
  const patientLatestPrediction = preparePatientLatestPrediction();
  const latestHealthFormReport =
    prepareLatestHealthFormReport(latestHealthFormId);

  useFocusEffect(
    useCallback(() => {
      return updateAiSelectedData;
    }, []),
  );

  return (
    <>
      {patientData.isSuccess ? (
        <Navbar
          navbarDescriptionTitle={`${patientData.data.name} ${patientData.data.surname}`}
        />
      ) : (
        <Navbar navbarDescriptionTitle="..." /> // maybe loading here or sth idk
      )}
      <SafeAreaView style={generalStyle.safeArea}>
        <ScrollView contentContainerStyle={mainStyle.container}>
          {patientResultsForAi.isSuccess && latestHealthForm.isSuccess ? (
            <ListCard
              title="Załączone badania"
              data={[...latestHealthForm.data, ...patientResultsForAi.data]}
              extraButton={
                <PrimaryButton
                  title="Poproś AI o analizę"
                  handleOnClick={startAiDiagnosis}
                />
              }
            />
          ) : (
            <LoadingCard title="Załączone badania" />
          )}
          {latestHealthFormReport.isError && (
            <Text>
              {latestHealthFormReport.error.message +
                " " +
                latestHealthFormReport.error.stack}
            </Text>
          )}
          {latestHealthFormReport.isSuccess ? (
            <AiAnalysisHealthFormCard
              data={latestHealthFormReport.data}
              title={"Analiza ostatniego formularza zdrowia"}
            />
          ) : (
            <LoadingCard title="Analiza ostatniego formularza zdrowia" />
          )}
          {patientLatestPrediction.isSuccess ? (
            <AiAnalysisResultCard
              data={patientLatestPrediction.data}
              title={"Wyniki poprzednich analiz AI"}
            />
          ) : (
            <LoadingCard title="Wyniki poprzednich analiz AI" />
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
