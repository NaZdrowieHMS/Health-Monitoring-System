import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import { LinkButton, PrimaryButton } from "components/atoms";
import primaryColors from "properties/colors";
import { authenticationScreenStyle } from "properties/styles";
import React from "react";
import { Keyboard, Text, View, SafeAreaView } from "react-native";

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
  const navigateToLoginScreen = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView
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
        <LinkButton
          title="Zaloguj się"
          color={primaryColors.darkGrey}
          helperText="Masz już konto?"
          fontWeight="bold"
          handleOnClick={navigateToLoginScreen}
        />
      </View>
    </SafeAreaView>
  );
};
