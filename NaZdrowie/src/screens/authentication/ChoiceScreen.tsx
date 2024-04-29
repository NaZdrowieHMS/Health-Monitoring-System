import { PrimaryButton } from "components/atoms";
import loginScreenStyle from "properties/styles/loginScreenStyle";
import React from "react";
import { Keyboard, Text, View } from "react-native";

function ChoiceScreen({ navigation }) {
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
    <View style={loginScreenStyle.container} onTouchStart={dismissKeyboard}>
      <View>
        <Text style={loginScreenStyle.h1}>Na Zdrowie!</Text>
        <Text style={loginScreenStyle.h2}>Dołącz do nas!</Text>
      </View>
      <View style={loginScreenStyle.inputContainer}>
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
}

export default ChoiceScreen;
