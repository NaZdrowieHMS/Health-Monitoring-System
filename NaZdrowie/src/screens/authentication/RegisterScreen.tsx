import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import { PrimaryButton, TextInputPersonalized } from "components/atoms";
import primaryColors from "properties/colors";
import loginScreenStyle from "properties/styles/loginScreenStyle";
import { paddingSize } from "properties/vars";
import React from "react";
import { Keyboard, ScrollView, StyleSheet, Text, View } from "react-native";

const registerScreenStyle = StyleSheet.create({
  container: {
    paddingHorizontal: paddingSize.big,
    paddingVertical: paddingSize.xxBig,
    rowGap: paddingSize.xxBig,
    backgroundColor: primaryColors.white,
    flexGrow: 1,
    justifyContent: "center",
  },
});

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
        <Text style={loginScreenStyle.h1}>Na Zdrowie!</Text>
        <Text style={loginScreenStyle.h2}>Dołącz do nas!</Text>
      </View>
      <View style={loginScreenStyle.inputContainer}>
        <TextInputPersonalized placeholder="Adres email" />
        <TextInputPersonalized placeholder="PESEL" />
        {doctorScreen && <TextInputPersonalized placeholder="Numer PWZ" />}
        <TextInputPersonalized placeholder="Login" />
        <TextInputPersonalized placeholder="Hasło" />
        <TextInputPersonalized placeholder="Powtórz hasło" />
      </View>
      <PrimaryButton
        title="Zarejestruj się"
        handleOnClick={navigateToLoginScreen}
      />
    </ScrollView>
  );
};

export default RegisterScreen;
