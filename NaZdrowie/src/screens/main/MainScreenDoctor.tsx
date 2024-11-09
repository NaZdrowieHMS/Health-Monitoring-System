import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import { LinkButton, PrimaryButton } from "components/atoms";
import { ListCard, LoadingCard } from "components/molecules";
import { UserContext } from "components/organisms/context";
import { mainStyle } from "properties/styles/mainStyle";
import { PatientData, PatientResult } from "properties/types";
import React, { useContext } from "react";
import { View, ScrollView } from "react-native";
import {
  useFetchLatestPatients,
  useFetchLatestResults,
} from "services/doctorData";

const MainScreenDoctor = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "MainScreen">) => {
  const { currentUser } = useContext(UserContext);

  const latestPatients = useFetchLatestPatients(currentUser, (data) =>
    data.map(formatPatientData),
  );
  const latestResults = useFetchLatestResults(currentUser, (data) =>
    data.map(formatResultEntry),
  );

  const navigateToAllPatientsScreen = () => {
    navigation.navigate("AllPatients");
  };

  const navigateToPatientScreen = (patientId: number) => {
    navigation.navigate("PatientDetails", {
      patientId,
    });
  };

  function formatPatientData(patient: PatientData) {
    return {
      text: `${patient.name} ${patient.surname}`,
      buttons: [
        <LinkButton
          key={patient.id}
          title="Przejdź"
          handleOnClick={() => {
            navigateToPatientScreen(patient.id);
          }}
        />,
      ],
    };
  }

  function formatResultEntry(
    entry: PatientResult & {
      patient: PatientData;
    },
  ) {
    return {
      text: `${entry.patient.name}: ${entry.testType}`,
      buttons: [<LinkButton key={entry.id} title="Podgląd" />],
    };
  }

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
      {latestPatients.isSuccess && latestResults.isSuccess ? (
        <>
          <ListCard
            title="Ostatnio leczeni pacjenci"
            data={latestPatients.data}
          />
          <ListCard
            title="Ostatnio załączone badania"
            data={latestResults.data}
          />
        </>
      ) : (
        <LoadingCard />
      )}
    </ScrollView>
  );
};

export default MainScreenDoctor;
