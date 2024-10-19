import { LinkButton, PrimaryButton } from "components/atoms";
import {
  AiAnalysisResultCard,
  ImagePickerComponent,
  ListCard,
  Navbar,
} from "components/molecules";
import primaryColors from "properties/colors";
import { ListCardElement } from "properties/types/ListCardProps";
import { PatientData, PatientResult } from "properties/types/PatientDataProps";
import { paddingSize } from "properties/vars";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { getPatient, getResults } from "services/patientData";

const patientStyle = StyleSheet.create({
  container: {
    backgroundColor: primaryColors.babyBlue,
    paddingHorizontal: paddingSize.medium,
    paddingVertical: paddingSize.mediumBig,
    rowGap: paddingSize.mediumBig,
  },
});

const AiDiagnosis = ({ route, navigation }) => {
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
      checkboxStatus: result.ai_selected,
    },
    text: result.test_type,
    buttons: [<LinkButton title="Podgląd" color={primaryColors.lightBlue} />],
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
      <ScrollView contentContainerStyle={patientStyle.container}>
        <ImagePickerComponent />
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

export default AiDiagnosis;
