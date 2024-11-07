import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import { PrimaryButton, PersonalizedTextInput } from "components/atoms";
import {
  authenticationScreenStyle,
  registerScreenStyle,
} from "properties/styles";
import React from "react";
import { Keyboard, ScrollView, Text, View } from "react-native";

const RegisterScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, "Register">) => {
  const { doctorScreen } = route.params;

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const navigateToLoginScreen = () => {
    navigation.navigate("Login");
  };

  return (
    <ScrollView
      contentContainerStyle={registerScreenStyle.container}
      onTouchStart={dismissKeyboard}
    >
      <View>
        <Text style={authenticationScreenStyle.h1}>Na Zdrowie!</Text>
        <Text style={authenticationScreenStyle.h2}>Dołącz do nas!</Text>
      </View>
      <View style={authenticationScreenStyle.inputContainer}>
        <PersonalizedTextInput placeholder="Adres email" />
        <PersonalizedTextInput placeholder="PESEL" />
        {doctorScreen && <PersonalizedTextInput placeholder="Numer PWZ" />}
        <PersonalizedTextInput placeholder="Login" />
        <PersonalizedTextInput placeholder="Hasło" />
        <PersonalizedTextInput placeholder="Powtórz hasło" />
      </View>
      <PrimaryButton
        title="Zarejestruj się"
        handleOnClick={navigateToLoginScreen}
      />
    </ScrollView>
  );
};

export default RegisterScreen;
