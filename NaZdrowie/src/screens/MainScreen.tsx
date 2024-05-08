import { PrimaryButton } from "components/atoms";
import ListCard from "components/molecules/ListCard";
import Navbar from "components/molecules/Navbar";
import primaryColors from "properties/colors";
import { paddingSize } from "properties/vars";
import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

function MainScreen({ navigation }) {
  const mainStyle = StyleSheet.create({
    container: {
      backgroundColor: primaryColors.babyBlue,
      flexGrow: 1,
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
    <View>
      <Navbar />
      <ScrollView contentContainerStyle={mainStyle.container}>
        <View style={mainStyle.buttonContainer}>
          <PrimaryButton title="Czaty z pacjentami" />
          <PrimaryButton title="Moi pacjenci" />
          <PrimaryButton title="Znajdź nowego pacjenta" />
          <PrimaryButton title="Wygeneruj kod QR" />
        </View>
        <ListCard title="Ostatnio leczeni pacjenci" data={[]} />
      </ScrollView>
    </View>
  );
}

export default MainScreen;
