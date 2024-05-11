import { Navbar } from "components/molecules";
import primaryColors from "properties/colors";
import { paddingSize } from "properties/vars";
import React from "react";
import { View, StyleSheet } from "react-native";

import MainScreenDoctor from "./MainScreenDoctor";
import MainScreenPatient from "./MainScreenPatient";

export const mainStyle = StyleSheet.create({
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

const MainScreen = ({ navigation }) => {
  //TODO get this information from server based on user token
  const doctorScreen = true;

  return (
    <View style={{ flex: 1 }}>
      <Navbar />
      {doctorScreen ? (
        <MainScreenDoctor navigation={navigation} />
      ) : (
        <MainScreenPatient navigation={navigation} />
      )}
    </View>
  );
};

export default MainScreen;
