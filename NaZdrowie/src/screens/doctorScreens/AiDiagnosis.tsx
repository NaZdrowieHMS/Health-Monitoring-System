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
import { useDoctorData } from "components/organisms";
import { UserContext } from "components/organisms/context";
import { generalStyle, mainStyle } from "properties/styles";
import React, { useContext } from "react";
import { ScrollView, SafeAreaView } from "react-native";
import { useFetchPatient } from "services/patientData";

export const AiDiagnosis = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, "AiDiagnosis">) => {
  const { patientId } = route.params;
  const { currentUser } = useContext(UserContext);
  const patient = useFetchPatient(currentUser, null, patientId);
  const { patientResultsForAi, startAiDiagnosis, updateAiSelectedData } = useDoctorData(navigation, currentUser, patientId);

  useFocusEffect(
    updateAiSelectedData
  )

  return (
    <>
      {patient.isSuccess ? (
        <Navbar
          navigation={(path) => navigation.navigate(path)}
          navbarDescriptionTitle={`${patient.data.name} ${patient.data.surname}`}
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
          <AiAnalysisResultCard />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
