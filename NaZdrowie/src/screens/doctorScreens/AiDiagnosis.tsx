import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import { PrimaryButton } from "components/atoms";
import { AiAnalysisResultCard, ListCard } from "components/molecules/cards";
import { Navbar } from "components/molecules";
import { QueryWrapper } from "components/organisms";
import { UserContext } from "components/organisms/context";
import {
  useAiData,
  useHealthFormData,
  usePatientData,
} from "components/organisms/dataHooks";
import { generalStyle, mainStyle } from "properties/styles";
import React, { useCallback, useContext } from "react";
import { ScrollView, SafeAreaView } from "react-native";
import Toast from "react-native-toast-message";

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
      <QueryWrapper
        queries={[patientData]}
        renderSuccess={([patient]) => (
          <Navbar
            navbarDescriptionTitle={`${patient.name} ${patient.surname}`}
          />
        )}
        renderLoading={() => <Navbar navbarDescriptionTitle="..." />}
        renderError={(errors) => {
          Toast.show({
            type: "error",
            text1: "Błąd w pobieraniu informacji o pacjenice",
            text2: errors.join(", "),
          });
          return <Navbar navbarDescriptionTitle="..." />;
        }}
      />
      <SafeAreaView style={generalStyle.safeArea}>
        <ScrollView contentContainerStyle={mainStyle.container}>
          <QueryWrapper
            queries={[patientResultsForAi, latestHealthForm]}
            temporaryTitle="Załączone badania"
            renderSuccess={([results, healthForm]) => (
              <ListCard
                title="Załączone badania"
                data={[...healthForm, ...results]}
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
            )}
          />
          <QueryWrapper
            queries={[patientLatestPrediction]}
            temporaryTitle="Wyniki ostatnio przeprowadzonej analizy AI"
            renderSuccess={([prediction]) => (
              <AiAnalysisResultCard
                aiPrediction={prediction[0]}
                title={
                  "Wyniki ostatnio przeprowadzonej analizy AI z dnia " +
                  prediction[0].predictionDate
                }
              />
            )}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
