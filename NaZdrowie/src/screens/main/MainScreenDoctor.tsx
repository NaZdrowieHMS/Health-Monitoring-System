import { LinkButton, PrimaryButton } from "components/atoms";
import { ListCard } from "components/molecules";
import primaryColors from "properties/colors";
import React from "react";
import { View, ScrollView } from "react-native";

import { mainStyle } from "./MainScreen";

const MainScreenDoctor = ({ navigation }) => {
  const navigateToAllPatientsScreen = () => {
    navigation.navigate("AllPatients");
  };

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
      <ListCard
        title="Ostatnio leczeni pacjenci"
        data={[
          {
            text: "Jakiś tam pacjent",
            buttons: [
              <LinkButton title="Przejdź" color={primaryColors.lightBlue} />,
            ],
          },
        ]}
      />
      <ListCard
        title="Ostatnio załączone badania"
        data={[
          {
            text: "Jakiś tam pacjent: USG piersi",
            buttons: [
              <LinkButton title="Podgląd" color={primaryColors.lightBlue} />,
            ],
          },
          {
            text: "Jakiś tam pacjent: USG piersi",
            buttons: [
              <LinkButton title="Podgląd" color={primaryColors.lightBlue} />,
            ],
          },
        ]}
      />
    </ScrollView>
  );
};

export default MainScreenDoctor;
