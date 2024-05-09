import { LinkButton, PrimaryButton } from "components/atoms";
import { ListCard } from "components/molecules";
import primaryColors from "properties/colors";
import { paddingSize } from "properties/vars";
import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

const MainScreenDoctor = () => {
  const mainStyle = StyleSheet.create({
    container: {
      backgroundColor: primaryColors.babyBlue,
      paddingHorizontal: paddingSize.medium,
      paddingVertical: paddingSize.mediumBig,
      rowGap: paddingSize.mediumBig,
    },
    buttonContainer: {
      paddingHorizontal: paddingSize.mediumBig,
      rowGap: paddingSize.small,
    },
  });

  return (
    <ScrollView contentContainerStyle={mainStyle.container}>
      <View style={mainStyle.buttonContainer}>
        <PrimaryButton title="Czaty z pacjentami" />
        <PrimaryButton title="Moi pacjenci" />
        <PrimaryButton title="Znajdź nowego pacjenta" />
        <PrimaryButton title="Wygeneruj kod QR" />
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
