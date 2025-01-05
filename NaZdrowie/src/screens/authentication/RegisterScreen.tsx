import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import {
  PrimaryButton,
  PersonalizedTextInput,
  LinkButton,
} from "components/atoms";
import { useScreensNavigation } from "components/organisms";
import primaryColors from "properties/colors";
import {
  authenticationScreenStyle,
  registerScreenStyle,
} from "properties/styles";
import { UserRegisterData } from "properties/types";
import React, { useState } from "react";
import { Keyboard, ScrollView, Text, View, SafeAreaView } from "react-native";
import Toast from "react-native-toast-message";
import { useRegisterUser } from "services/userData";
import * as Crypto from "expo-crypto";

export const RegisterScreen = ({
  route,
}: NativeStackScreenProps<RootStackParamList, "Register">) => {
  const { doctorScreen } = route.params;

  const [userFormItems, setUserFormItems] = useState<UserRegisterData>({
    role: doctorScreen ? "Doctor" : "Patient",
    name: "",
    surname: "",
    email: "",
    pesel: "",
    password: "",
    password2: "",
    pwz: null,
  });

  const [errors, setErrors] = useState<Partial<UserRegisterData>>({});

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const { navigateToLoginScreen } = useScreensNavigation();
  const register = useRegisterUser(navigateToLoginScreen);
  const handleFormItemChange = (
    field: keyof UserRegisterData,
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
    const newErrors: Partial<UserRegisterData> = {};

    if (!userFormItems.email || !/\S+@\S+\.\S+/.test(userFormItems.email)) {
      newErrors.email = "Podaj poprawny adres email";
    }
    if (!userFormItems.pesel || userFormItems.pesel.length !== 11) {
      newErrors.pesel = "PESEL musi mieć 11 cyfr";
    }
    if (
      doctorScreen &&
      (!userFormItems.pwz || userFormItems.pwz.length !== 7)
    ) {
      newErrors.pwz = "Numer PWZ musi mieć 7 cyfr";
    }
    if (!userFormItems.name) {
      newErrors.name = "Imię jest wymagane";
    }
    if (!userFormItems.surname) {
      newErrors.surname = "Nazwisko jest wymagane";
    }
    if (!userFormItems.password || userFormItems.password.length < 6) {
      newErrors.password = "Hasło musi mieć co najmniej 6 znaków";
    }
    if (userFormItems.password !== userFormItems.password2) {
      newErrors.password = "Hasła nie są identyczne.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (validateForm()) {
      const userData = {
        ...userFormItems,
        password: await Crypto.digestStringAsync(
          Crypto.CryptoDigestAlgorithm.SHA512,
          userFormItems.password,
        ),
      };
      register.mutate(userData);
    } else {
      Toast.show({
        type: "error",
        text1: "Błąd rejestracji",
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
          <Text style={authenticationScreenStyle.h2}>Dołącz do nas!</Text>
        </View>
        <View style={authenticationScreenStyle.inputContainer}>
          <PersonalizedTextInput
            placeholder="Adres email"
            onChange={(value) => handleFormItemChange("email", value)}
            error={errors.email}
          />
          <PersonalizedTextInput
            placeholder="PESEL"
            onChange={(value) => handleFormItemChange("pesel", value)}
            error={errors.pesel}
          />
          {doctorScreen && (
            <PersonalizedTextInput
              placeholder="Numer PWZ"
              onChange={(value) => handleFormItemChange("pwz", value)}
              error={errors.pwz}
            />
          )}
          <PersonalizedTextInput
            placeholder="Imię"
            onChange={(value) => handleFormItemChange("name", value)}
            error={errors.name}
          />
          <PersonalizedTextInput
            placeholder="Nazwisko"
            onChange={(value) => handleFormItemChange("surname", value)}
            error={errors.surname}
          />
          <PersonalizedTextInput
            placeholder="Hasło"
            onChange={(value) => handleFormItemChange("password", value)}
            error={errors.password}
          />
          <PersonalizedTextInput
            placeholder="Powtórz hasło"
            onChange={(value) => handleFormItemChange("password2", value)}
            error={errors.password2}
          />
        </View>
        <View style={authenticationScreenStyle.buttonsContainer}>
          <PrimaryButton
            title="Zarejestruj się"
            handleOnClick={handleRegister}
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
