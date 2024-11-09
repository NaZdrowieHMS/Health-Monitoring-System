import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import { PrimaryButton } from "components/atoms";
import { authenticationScreenStyle } from "properties/styles";
import React from "react";
import { Keyboard, Text, View } from "react-native";

export const ChoiceScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Choice">) => {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const navigateToPatientRegisterScreen = () => {
    navigation.navigate("Register", { doctorScreen: false });
  };

  const navigateToDoctorRegisterScreen = () => {
    navigation.navigate("Register", { doctorScreen: true });
  };

  return (
    <View
      style={authenticationScreenStyle.container}
      onTouchStart={dismissKeyboard}
    >
      <View>
        <Text style={authenticationScreenStyle.h1}>Na Zdrowie!</Text>
        <Text style={authenticationScreenStyle.h2}>Dołącz do nas!</Text>
      </View>
      <View style={authenticationScreenStyle.inputContainer}>
        <PrimaryButton
          handleOnClick={navigateToPatientRegisterScreen}
          title="Jestem pacjentem"
        />
        <PrimaryButton
          handleOnClick={navigateToDoctorRegisterScreen}
          title="Jestem lekarzem"
        />
      </View>
    </View>
  );
};
