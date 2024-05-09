import { Navbar } from "components/molecules";
import React from "react";
import { View } from "react-native";

import MainScreenDoctor from "./MainScreenDoctor";
import MainScreenPatient from "./MainScreenPatient";

const MainScreen = ({ navigation, route }) => {
  //TODO get this information from server based on user token
  const doctorScreen = false;

  return (
    <View style={{ flex: 1 }}>
      <Navbar />
      {doctorScreen ? <MainScreenDoctor /> : <MainScreenPatient />}
    </View>
  );
};

export default MainScreen;
