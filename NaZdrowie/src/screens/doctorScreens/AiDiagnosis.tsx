import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import { LinkButton, PrimaryButton } from "components/atoms";
import { AiAnalysisResultCard, ListCard, Navbar } from "components/molecules";
import { mainStyle } from "properties/styles";
import { PatientData, PatientResult, ListCardElement } from "properties/types";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { getPatient, getResults } from "services/patientData";

export const AiDiagnosis = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, "AiDiagnosis">) => {
  const { patientId } = route.params;
  const [resultsData, setResultssData] = useState<ListCardElement[]>([]);
  const [patientData, setPatientData] = useState<PatientData>(null);

  useEffect(() => {
    setResults(patientId);
    setPatient(patientId);
  }, []);

  const setResults = async (patientId: number) => {
    try {
      const data = await getResults(patientId);
      const formattedResults = data.map(formatResultsData);
      setResultssData(formattedResults);
    } catch (error) {
      console.error("Error fetching latest patients:", error);
    }
  };

  const formatResultsData = (result: PatientResult) => ({
    checkbox: {
      checkboxStatus: true, // TODO
    },
    text: result.testType,
    buttons: [<LinkButton title="Podgląd" />],
  });

  const setPatient = async (patientId: number) => {
    try {
      const data = await getPatient(patientId);
      setPatientData(data);
    } catch (error) {
      console.error("Error fetching latest patients:", error);
    }
  };

  // const startAiDiagnosis = () => {};

  return (
    <View style={{ flex: 1 }}>
      <Navbar
        navbarDescriptionTitle={
          `${patientData?.name} ${patientData?.surname}` || ""
        }
      />
      <ScrollView contentContainerStyle={mainStyle.container}>
        <ListCard
          title="Załączone badania"
          data={resultsData}
          extraButton={<PrimaryButton title="Poproś AI o analizę" />}
        />
        <AiAnalysisResultCard />
      </ScrollView>
    </View>
  );
};
