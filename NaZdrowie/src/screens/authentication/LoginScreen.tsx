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
  const [login, setLogin] = React.useState<string>("");
  const { setCurrentUser } = useContext(UserContext);
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const { navigateToRegisterScreen, navigateToMainScreen } =
    useScreensNavigation();

  const processUserInformationAndNavigateToMainScreen = () => {
    const userInfo = login.split("-");
    if (userInfo.length === 2 && userInfo[1].length > 0) {
      // temporary solution to try out different data
      setCurrentUser({
        id: parseInt(userInfo[1], 10),
        isDoctor: userInfo[0] !== "p",
      });
    } else if (login !== "patient") {
      setCurrentUser({ id: 1, isDoctor: true });
    } else {
      setCurrentUser({ id: 3, isDoctor: false });
    }
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
          <PersonalizedTextInput placeholder="login" onChange={setLogin} />
          <View style={authenticationScreenStyle.buttonsContainer}>
            <PersonalizedTextInput placeholder="password" />
            <LinkButton
              title="Zapomniałeś hasła?"
              color={primaryColors.lightGrey}
            />
          </View>
        </View>
        <View style={authenticationScreenStyle.buttonsContainer}>
          <PrimaryButton
            title="Zaloguj się"
            handleOnClick={processUserInformationAndNavigateToMainScreen}
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
