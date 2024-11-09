import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import { LinkButton, PrimaryButton } from "components/atoms";
import {
  AiAnalysisResultCard,
  ListCard,
  LoadingCard,
  Navbar,
} from "components/molecules";
import { UserContext } from "components/organisms/context";
import { mainStyle } from "properties/styles";
import { PatientResult } from "properties/types";
import React, { useContext } from "react";
import { ScrollView, View } from "react-native";
import { useFetchPatient, useFetchResults } from "services/patientData";

export const AiDiagnosis = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, "AiDiagnosis">) => {
  const { patientId } = route.params;
  const { currentUser } = useContext(UserContext);

  const results = useFetchResults(
    currentUser,
    (data) => data.map(formatResultsData),
    patientId,
  );
  const patient = useFetchPatient(currentUser, null, patientId);

  function formatResultsData(result: PatientResult) {
    return {
      checkbox: {
        checkboxStatus: true, // TODO
      },
      text: result.testType,
      buttons: [<LinkButton title="Podgląd" />],
    };
  }

  // const startAiDiagnosis = () => {};

  return (
    <View style={{ flex: 1 }}>
      {patient.isSuccess ? (
        <Navbar
          navbarDescriptionTitle={`${patient.data.name} ${patient.data.surname}`}
        />
      ) : (
        <Navbar navbarDescriptionTitle="..." /> // maybe loading here or sth idk
      )}
      <ScrollView contentContainerStyle={mainStyle.container}>
        {results.isSuccess ? (
          <ListCard
            title="Załączone badania"
            data={results.data}
            extraButton={<PrimaryButton title="Poproś AI o analizę" />}
          />
        ) : (
          <LoadingCard title="Załączone badania" />
        )}
        <AiAnalysisResultCard />
      </ScrollView>
    </View>
  );
};
