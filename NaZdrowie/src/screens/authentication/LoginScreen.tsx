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
import React, { useContext, useEffect, useState } from "react";
import { Keyboard, Text, View, SafeAreaView, ScrollView } from "react-native";
import { useLoginUser } from "services/userData";
import { UserLoginData } from "properties/types";
import * as Crypto from "expo-crypto";
import Toast from "react-native-toast-message";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { WEB_CLIENT_ID, IOS_CLIENT_ID } from "services/config";

export const LoginScreen = () => {
  const { setCurrentUser } = useContext(UserContext);
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  const { navigateToRegisterScreen, navigateToMainScreen } =
    useScreensNavigation();
  const login = useLoginUser(
    navigateToMainScreen,
    navigateToRegisterScreen,
    setCurrentUser,
  );
  const [userFormItems, setUserFormItems] = useState<UserLoginData>({
    email: "",
    password: "",
  });

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
  const configureGoogleSignIn = () => {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
      iosClientId: IOS_CLIENT_ID,
    });
  };

  useEffect(() => {
    configureGoogleSignIn();
  });

  const googleSignin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      login.mutate({ email: userInfo.data.user.email, password: "goog" });
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: "Wystąpił błąd w trakcie logowania",
        text2: `${error.message}`,
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
          <PrimaryButton
            title="Zaloguj się poprzez Google"
            handleOnClick={googleSignin}
            icon="google"
          />
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
