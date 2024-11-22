import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import {
  PrimaryButton,
  PersonalizedTextInput,
  LinkButton,
} from "components/atoms";
import primaryColors from "properties/colors";
import {
  authenticationScreenStyle,
  registerScreenStyle,
} from "properties/styles";
import { StringNavigation } from "properties/types";
import React from "react";
import { Keyboard, ScrollView, Text, View, SafeAreaView } from "react-native";

export const RegisterScreen = ({
  route,
}: NativeStackScreenProps<RootStackParamList, "Register">) => {
  const { doctorScreen } = route.params;
  const { navigate } = useNavigation<StringNavigation>();
  const dismissKeyboard = () => {
    Keyboard.dismiss();
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
          <PersonalizedTextInput placeholder="Adres email" />
          <PersonalizedTextInput placeholder="PESEL" />
          {doctorScreen && <PersonalizedTextInput placeholder="Numer PWZ" />}
          <PersonalizedTextInput placeholder="Login" />
          <PersonalizedTextInput placeholder="Hasło" />
          <PersonalizedTextInput placeholder="Powtórz hasło" />
        </View>
        <View style={authenticationScreenStyle.buttonsContainer}>
          <PrimaryButton
            title="Zarejestruj się"
            handleOnClick={navigateToLoginScreen}
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
