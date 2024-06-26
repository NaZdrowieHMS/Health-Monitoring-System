import { LinkButton, PrimaryButton } from "components/atoms";
import { ListCard } from "components/molecules";
import primaryColors from "properties/colors";
import { mainStyle } from "properties/styles/mainStyle";
import React from "react";
import { View, ScrollView } from "react-native";
import { getLatestPatients, getLatestResults } from "services/doctorScreenData";

const MainScreenDoctor = ({ navigation }) => {
  const navigateToAllPatientsScreen = () => {
    navigation.navigate("AllPatients");
  };

  const latestPatientsData = getLatestPatients().map((patient) => ({
    text: patient.patientName,
    buttons: [
      <LinkButton
        key={patient.patientId}
        title="Przejdź"
        color={primaryColors.lightBlue}
      />,
    ],
  }));

  const latestResultsData = getLatestResults().map((entry) => ({
    text: `${entry.patientName}: ${entry.resultName}`,
    buttons: [
      <LinkButton
        key={entry.resultId}
        title="Podgląd"
        color={primaryColors.lightBlue}
      />,
    ],
  }));

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
