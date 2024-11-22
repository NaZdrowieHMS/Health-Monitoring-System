import { useNavigation } from "@react-navigation/native";
import { LinkButton, PrimaryButton } from "components/atoms";
import primaryColors from "properties/colors";
import {
  authenticationScreenStyle,
  registerScreenStyle,
} from "properties/styles";
import { StringNavigation } from "properties/types";
import React from "react";
import { Keyboard, Text, View, SafeAreaView, ScrollView } from "react-native";

export const ChoiceScreen = () => {
  const { navigate } = useNavigation<StringNavigation>();
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const navigateToPatientRegisterScreen = () => {
    navigate("Register", { doctorScreen: false });
  };

  const navigateToDoctorRegisterScreen = () => {
    navigate("Register", { doctorScreen: true });
  };
  const navigateToLoginScreen = () => {
    navigate("Login");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: primaryColors.white }}>
      <ScrollView
        contentContainerStyle={registerScreenStyle.container}
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
      </ScrollView>
    </SafeAreaView>
  );
};
