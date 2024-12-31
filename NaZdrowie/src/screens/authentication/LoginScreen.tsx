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
import React, { useContext } from "react";
import { Keyboard, Text, View, SafeAreaView, ScrollView } from "react-native";

export const LoginScreen = () => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const { vanillaSignin, googleSignin } = useContext(UserContext);
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const { navigateToRegisterScreen, navigateToMainScreen } =
    useScreensNavigation();

  const handleVanillaSignIn = () => {
    vanillaSignin(email, password);
    navigateToMainScreen();
  };
  const handleGoogleSignIn = () => {
    googleSignin();
    navigateToMainScreen();
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
          <PersonalizedTextInput placeholder="email" onChange={setEmail} />
          <View style={authenticationScreenStyle.buttonsContainer}>
            <PersonalizedTextInput placeholder="hasło" onChange={setPassword} />
            <LinkButton
              title="Zapomniałeś hasła?"
              color={primaryColors.lightGrey}
            />
          </View>
        </View>
        <View style={authenticationScreenStyle.buttonsContainer}>
          <PrimaryButton
            title="Zaloguj się"
            handleOnClick={handleVanillaSignIn}
          />
          <PrimaryButton
            title="Zaloguj się poprzez Google"
            handleOnClick={handleGoogleSignIn}
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
