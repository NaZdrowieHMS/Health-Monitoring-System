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
import { useAiData, useDoctorData } from "components/organisms";
import { UserContext } from "components/organisms/context";
import { generalStyle, mainStyle } from "properties/styles";
import React, { useContext } from "react";
import { ScrollView, SafeAreaView } from "react-native";

export const AiDiagnosis = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, "AiDiagnosis">) => {
  const { patientId } = route.params;
  const { currentUser } = useContext(UserContext);
  const { currentPatient }
    = useDoctorData(navigation, currentUser, patientId);
  const { patientResultsForAi, startAiDiagnosis, updateAiSelectedData, patientPredictions } 
    = useAiData(currentUser, patientId)
  useFocusEffect(
    updateAiSelectedData
  )

  return (
    <>
      {currentPatient.isSuccess ? (
        <Navbar
          navigation={(path) => navigation.navigate(path)}
          navbarDescriptionTitle={`${currentPatient.data.name} ${currentPatient.data.surname}`}
        />
      ) : (
        <Navbar
          navigation={(path) => navigation.navigate(path)}
          navbarDescriptionTitle="..."
        /> // maybe loading here or sth idk
      )}
      <SafeAreaView style={generalStyle.safeArea}>
        <ScrollView contentContainerStyle={mainStyle.container}>
          {patientResultsForAi.isSuccess ? (
            <ListCard
              title="Załączone badania"
              data={patientResultsForAi.data}
              extraButton={<PrimaryButton title="Poproś AI o analizę" handleOnClick={startAiDiagnosis} />}
            />
          ) : (
            <LoadingCard title="Załączone badania" />
          )}
          {patientPredictions.isSuccess 
          ? <AiAnalysisResultCard data={patientPredictions.data} /> 
          : <LoadingCard title="Wyniki poprzednich analiz AI"/>}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
