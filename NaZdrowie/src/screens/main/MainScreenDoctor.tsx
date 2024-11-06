import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import { LinkButton, PrimaryButton } from "components/atoms";
import { ListCard } from "components/molecules";
import primaryColors from "properties/colors";
import { mainStyle } from "properties/styles/mainStyle";
import { PatientData, PatientResult, ListCardElement } from "properties/types";
import React, { useContext, useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { UserContext } from "services/context";
import { getLatestPatients, getLatestResults } from "services/doctorData";

const MainScreenDoctor = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "MainScreen">) => {
  const { currentUser } = useContext(UserContext);
  const [latestPatientsData, setLatestPatientsData] = useState<
    ListCardElement[]
  >([]);

  const [latestResultsData, setLatestResultsData] = useState<ListCardElement[]>(
    [],
  );

  useEffect(() => {
    setLatestPatients(currentUser.id);
    setLatestResults(currentUser.id);
  }, []);

  const navigateToAllPatientsScreen = () => {
    navigation.navigate("AllPatients");
  };

  const navigateToPatientScreen = (patientId: number) => {
    navigation.navigate("PatientDetails", {
      patientId,
    });
  };

  const setLatestPatients = async (doctorId: number) => {
    try {
      const data = await getLatestPatients(doctorId);
      const formattedPatients = data.map(formatPatientData);
      setLatestPatientsData(formattedPatients);
    } catch (error) {
      console.error("Error fetching latest patients:", error);
    }
  };

  const formatPatientData = (patient: PatientData) => ({
    text: `${patient.name} ${patient.surname}`,
    buttons: [
      <LinkButton
        key={patient.id}
        title="Przejdź"
        color={primaryColors.lightBlue}
        handleOnClick={() => {
          navigateToPatientScreen(patient.id);
        }}
      />,
    ],
  });

  const setLatestResults = async (doctorId: number) => {
    try {
      const data = await getLatestResults(doctorId);
      const formattedResults = data.map(formatResultEntry);
      setLatestResultsData(formattedResults);
    } catch (error) {
      console.error("Error fetching latest results:", error);
    }
  };

  const formatResultEntry = (
    entry: PatientResult & {
      patient: PatientData;
    },
  ) => ({
    text: `${entry.patient.name}: ${entry.testType}`,
    buttons: [
      <LinkButton
        key={entry.id}
        title="Podgląd"
        color={primaryColors.lightBlue}
      />,
    ],
  });

  return (
    <ScrollView contentContainerStyle={mainStyle.container}>
      <View style={mainStyle.buttonContainer}>
        <PrimaryButton
          handleOnClick={navigateToAllPatientsScreen}
          title="Moi pacjenci"
        />
        <PrimaryButton title="Czaty z pacjentami" />
        <PrimaryButton title="Wygeneruj kod QR" />
        <PrimaryButton title="Znajdź nowego pacjenta" />
      </View>
      <ListCard title="Ostatnio leczeni pacjenci" data={latestPatientsData} />
      <ListCard title="Ostatnio załączone badania" data={latestResultsData} />
    </ScrollView>
  );
};

export default MainScreenDoctor;
