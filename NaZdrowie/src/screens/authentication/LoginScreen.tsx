import {
  LinkButton,
  PrimaryButton,
  TextInputPersonalized,
} from "components/atoms";
import primaryColors from "properties/colors";
import loginScreenStyle from "properties/styles/loginScreenStyle";
import React from "react";
import { Keyboard, Text, View } from "react-native";

const LoginScreen = ({ navigation }) => {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const navigateToRegisterScreen = () => {
    navigation.navigate("Choice");
  };

  const navigateToMainScreen = () => {
    navigation.navigate("MainScreen");
  };

  return (
    <View style={loginScreenStyle.container} onTouchStart={dismissKeyboard}>
      <View>
        <Text style={loginScreenStyle.h1}>Na Zdrowie!</Text>
        <Text style={loginScreenStyle.h2}>Zaloguj się na swoje konto</Text>
      </View>
      <View style={loginScreenStyle.inputContainer}>
        <TextInputPersonalized placeholder="login" />
        <View style={loginScreenStyle.buttonsContainer}>
          <TextInputPersonalized placeholder="password" />
          <LinkButton
            title="Zapomniałeś hasła?"
            color={primaryColors.lightGrey}
          />
        </View>
      </View>
      <View style={loginScreenStyle.buttonsContainer}>
        <PrimaryButton
          title="Zaloguj się"
          handleOnClick={navigateToMainScreen}
        />
        <LinkButton
          title="Zarejestruj się"
          color={primaryColors.darkGrey}
          helperText="Nie masz konta?"
          fontWeight="bold"
          handleOnClick={navigateToRegisterScreen}
        />
      </View>
    </View>
  );
};

export default LoginScreen;
