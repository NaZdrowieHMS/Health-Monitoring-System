import { Navbar } from "components/molecules";
import React from "react";
import { View } from "react-native";

import MainScreenDoctor from "./MainScreenDoctor";
import MainScreenPatient from "./MainScreenPatient";

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
