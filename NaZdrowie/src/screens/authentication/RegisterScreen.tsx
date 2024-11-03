import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import { PrimaryButton, PersonalizedTextInput } from "components/atoms";
import primaryColors from "properties/colors";
import { loginScreenStyle } from "properties/styles";
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
