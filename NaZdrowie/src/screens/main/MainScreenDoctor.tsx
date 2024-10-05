import { LinkButton, PrimaryButton } from "components/atoms";
import { ListCard } from "components/molecules";
import primaryColors from "properties/colors";
import { mainStyle } from "properties/styles/mainStyle";
import { ListCardElement } from "properties/types/ListCardProps";
import { PatientData, ResultsData } from "properties/types/PatientDataProps";
import React, {useContext, useEffect, useState} from "react";
import { View, ScrollView } from "react-native";
import { getLatestPatients, getLatestResults } from "services/doctorData";
import {UserContext} from "services/UserProvider";

const MainScreenDoctor = ({ navigation }) => {
  const [currentUserData, _] = useContext(UserContext);
  const [latestPatientsData, setLatestPatientsData] = useState<
    ListCardElement[]
  >([]);

  const [latestResultsData, setLatestResultsData] = useState<ListCardElement[]>(
    [],
  );

  useEffect(() => {
    setLatestPatients(currentUserData.id);
    setLatestResults(currentUserData.id);
  }, []);

  const navigateToAllPatientsScreen = () => {
    navigation.navigate("AllPatients");
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
    entry: ResultsData & {
      patient: PatientData;
    },
  ) => ({
    text: `${entry.patient.name}: ${entry.test_type}`,
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
