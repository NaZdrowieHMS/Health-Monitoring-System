import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import { LinkButton, PrimaryButton } from "components/atoms";
import { ListCard, Overlay } from "components/molecules";
import primaryColors from "properties/colors";
import { mainStyle } from "properties/styles/mainStyle";
import { PatientData, ResultsData, ListCardElement } from "properties/types";
import React, { useContext, useEffect, useState } from "react";
import { View, ScrollView, Text } from "react-native";
import { UserContext } from "services/UserProvider";
import { getLatestPatients, getLatestResults } from "services/doctorData";

const MainScreenDoctor = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "MainScreen">) => {
  const [currentUserData, _] = useContext(UserContext);
  const [latestPatientsData, setLatestPatientsData] = useState<
    ListCardElement[]
  >([]);

  const [latestResultsData, setLatestResultsData] = useState<ListCardElement[]>(
    [],
  );
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);

  useEffect(() => {
    setLatestPatients(currentUserData.id);
    setLatestResults(currentUserData.id);
  }, []);

  const handleLatestResultsPreview = () =>
    setIsModalVisible(() => !isModalVisible);

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
        handleOnClick={handleLatestResultsPreview}
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
      {/* TODO: remove it from here and make proper modals in proper files */}
      <Overlay isVisible={isModalVisible}>
        <Overlay.Container>
          <Overlay.Header
            title="Siemano"
            handleClose={handleLatestResultsPreview}
          />
          <Overlay.Body>
            <Text>Blalala</Text>
          </Overlay.Body>
          <Overlay.Footer>
            <PrimaryButton title="Bla bla bla" />
          </Overlay.Footer>
        </Overlay.Container>
      </Overlay>
    </ScrollView>
  );
};

export default MainScreenDoctor;
