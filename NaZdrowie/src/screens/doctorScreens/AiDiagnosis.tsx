import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import { PrimaryButton } from "components/atoms";
import {
  AiAnalysisResultCard,
  ListCard,
  LoadingCard,
  Navbar,
} from "components/molecules";
import { UserContext } from "components/organisms/context";
import {
  useAiData,
  useHealthFormData,
  usePatientData,
} from "components/organisms/dataHooks";
import { generalStyle, mainStyle } from "properties/styles";
import React, { useCallback, useContext } from "react";
import { ScrollView, SafeAreaView } from "react-native";

export const AiDiagnosis = ({
  route,
}: NativeStackScreenProps<RootStackParamList, "AiDiagnosis">) => {
  const { patientId } = route.params;
  const { currentUser } = useContext(UserContext);
  const { preparePatientData } = usePatientData(currentUser, patientId);
  const {
    preparePatientResultsForAi,
    startAiDiagnosis,
    updateAiSelectedData,
    preparePatientLatestPrediction,
  } = useAiData(currentUser, patientId);
  const { prepareLatestHealthForm } = useHealthFormData(currentUser, patientId);
  const patientData = preparePatientData();
  const patientResultsForAi = preparePatientResultsForAi();
  const latestHealthForm = prepareLatestHealthForm();
  const patientLatestPrediction = preparePatientLatestPrediction();

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
                  handleOnClick={() => {
                    startAiDiagnosis();
                    patientLatestPrediction.refetch();
                  }}
                />
              }
            />
          ) : (
            <LoadingCard title="Załączone badania" />
          )}
          {patientLatestPrediction.isSuccess ? (
            <AiAnalysisResultCard
              aiPrediction={patientLatestPrediction.data[0]}
              title={
                "Wyniki ostatnio przeprowadzonej analizy AI z dnia " +
                patientLatestPrediction.data[0].predictionDate
              }
            />
          ) : (
            <LoadingCard title="Wyniki ostatnio przeprowadzonej analizy AI" />
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
