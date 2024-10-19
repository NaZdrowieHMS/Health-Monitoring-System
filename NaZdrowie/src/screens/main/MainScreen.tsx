import { Navbar } from "components/molecules";
import React, { useContext } from "react";
import { View } from "react-native";
import { UserContext } from "services/UserProvider";

import MainScreenDoctor from "./MainScreenDoctor";
import MainScreenPatient from "./MainScreenPatient";

const MainScreen = ({ navigation }) => {
  //TODO get this information from server based on user token
  const [currentUserData, _] = useContext(UserContext);
  const doctorScreen = currentUserData.isDoctor;

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
