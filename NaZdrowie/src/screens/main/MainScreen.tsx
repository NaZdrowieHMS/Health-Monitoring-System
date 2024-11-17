import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import { Navbar } from "components/molecules";
import { UserContext } from "components/organisms/context";
import React, { useContext } from "react";
import { View } from "react-native";

import { MainScreenDoctor } from "./MainScreenDoctor";
import { MainScreenPatient } from "./MainScreenPatient";

export const MainScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, "MainScreen">) => {
  //TODO get this information from server based on user token
  const { currentUser } = useContext(UserContext);
  const doctorScreen = currentUser.isDoctor;

  return (
    <View style={{ flex: 1 }}>
      <Navbar navigation={(path) => navigation.navigate(path)} />
      {doctorScreen ? (
        <MainScreenDoctor navigation={navigation} route={route} />
      ) : (
        <MainScreenPatient navigation={navigation} route={route} />
      )}
    </View>
  );
};
