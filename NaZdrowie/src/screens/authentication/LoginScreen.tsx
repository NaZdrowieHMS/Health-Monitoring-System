import {
  LinkButton,
  PrimaryButton,
  PersonalizedTextInput,
} from "components/atoms";
import { useScreensNavigation } from "components/organisms";
import { UserContext } from "components/organisms/context";
import primaryColors from "properties/colors";
import {
  authenticationScreenStyle,
  registerScreenStyle,
} from "properties/styles";
import React, { useContext, useState } from "react";
import { Keyboard, Text, View, SafeAreaView, ScrollView } from "react-native";
import { useLoginUser } from "services/userData";
import { UserLoginData } from "properties/types";
import * as Crypto from "expo-crypto";
import Toast from "react-native-toast-message";

export const LoginScreen = () => {
  const { vanillaSignin, googleSignin, setCurrentUser } =
    useContext(UserContext);
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  const { navigateToRegisterScreen, navigateToMainScreen } =
    useScreensNavigation();
  const login = useLoginUser(navigateToMainScreen, setCurrentUser);
  const [userFormItems, setUserFormItems] = useState<UserLoginData>({
    email: "",
    password: "",
  });

  // const handleVanillaSignIn = () => {
  //   vanillaSignin(email, password);
  //   navigateToMainScreen();
  // };
  // const handleGoogleSignIn = () => {
  //   googleSignin();
  //   navigateToMainScreen();
  const [errors, setErrors] = useState<Partial<UserLoginData>>({});
  const handleFormItemChange = (
    field: keyof UserLoginData,
    value: string | null,
  ) => {
    setUserFormItems((prevState) => ({
      ...prevState,
      [field]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: undefined,
    }));
  };
  const validateForm = (): boolean => {
    const newErrors: Partial<UserLoginData> = {};

    if (!userFormItems.email || !/\S+@\S+\.\S+/.test(userFormItems.email)) {
      newErrors.email = "Podaj poprawny adres email";
    }
    if (!userFormItems.password || userFormItems.password.length < 6) {
      newErrors.password = "Hasło musi mieć co najmniej 6 znaków";
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      const userData = {
        ...userFormItems,
        password: await Crypto.digestStringAsync(
          Crypto.CryptoDigestAlgorithm.SHA512,
          userFormItems.password,
        ),
      };
      login.mutate(userData);
    } else {
      Toast.show({
        type: "error",
        text1: "Błąd logowania",
        text2: "Popraw błędy w formularzu",
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: primaryColors.white }}>
      <ScrollView
        contentContainerStyle={registerScreenStyle.container}
        onTouchStart={dismissKeyboard}
      >
        <View>
          <Text style={authenticationScreenStyle.h1}>Na Zdrowie!</Text>
          <Text style={authenticationScreenStyle.h2}>
            Zaloguj się na swoje konto
          </Text>
        </View>
        <View style={authenticationScreenStyle.inputContainer}>
          <PersonalizedTextInput
            placeholder="Adres email"
            onChange={(value) => handleFormItemChange("email", value)}
            error={errors.email}
          />
          <View style={authenticationScreenStyle.buttonsContainer}>
            <PersonalizedTextInput
              placeholder="Hasło"
              onChange={(value) => handleFormItemChange("password", value)}
              error={errors.password}
              isPassword
            />
            <LinkButton
              title="Zapomniałeś hasła?"
              color={primaryColors.lightGrey}
            />
          </View>
        </View>
        <View style={authenticationScreenStyle.buttonsContainer}>
          {/*  <PrimaryButton
             title="Zaloguj się"
             handleOnClick={handleVanillaSignIn}
           />
           <PrimaryButton
             title="Zaloguj się poprzez Google"
             handleOnClick={handleGoogleSignIn}
             icon="google"
           /> */}
          <PrimaryButton title="Zaloguj się" handleOnClick={handleLogin} />
          <LinkButton
            title="Zarejestruj się"
            color={primaryColors.darkGrey}
            helperText="Nie masz konta?"
            fontWeight="bold"
            handleOnClick={navigateToRegisterScreen}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
