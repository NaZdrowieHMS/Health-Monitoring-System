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
import { useAiData, usePatientData } from "components/organisms";
import { UserContext } from "components/organisms/context";
import { generalStyle, mainStyle } from "properties/styles";
import React, { useContext } from "react";
import { ScrollView, SafeAreaView } from "react-native";

export const AiDiagnosis = ({
  route,
}: NativeStackScreenProps<RootStackParamList, "AiDiagnosis">) => {
  const { patientId } = route.params;
  const { currentUser } = useContext(UserContext);
  const { patientData } = usePatientData(currentUser, patientId);
  const {
    patientResultsForAi,
    startAiDiagnosis,
    updateAiSelectedData,
    patientPredictions,
  } = useAiData(currentUser, patientId);

  useFocusEffect(updateAiSelectedData);

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
          {patientResultsForAi.isSuccess ? (
            <ListCard
              title="Załączone badania"
              data={patientResultsForAi.data}
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
          {patientPredictions.isSuccess ? (
            <AiAnalysisResultCard data={patientPredictions.data} />
          ) : (
            <LoadingCard title="Wyniki poprzednich analiz AI" />
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
