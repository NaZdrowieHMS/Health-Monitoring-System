import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import {
  LinkButton,
  PrimaryButton,
  TextInputPersonalized,
} from "components/atoms";
import primaryColors from "properties/colors";
import loginScreenStyle from "properties/styles/loginScreenStyle";
import React, { useContext } from "react";
import { Keyboard, Text, View } from "react-native";
import { UserContext } from "services/UserProvider";

const LoginScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Login">) => {
  const [login, setLogin] = React.useState<string>("");
  const [_, setUser] = useContext(UserContext);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const navigateToRegisterScreen = () => {
    navigation.navigate("Choice");
  };

  const navigateToMainScreen = () => {
    // eslint-disable-next-line no-unused-expressions
    login !== "patient"
      ? setUser({ id: 1, isDoctor: true })
      : setUser({ id: 2, isDoctor: false });
    navigation.navigate("MainScreen");
  };

  return (
    <View style={loginScreenStyle.container} onTouchStart={dismissKeyboard}>
      <View>
        <Text style={loginScreenStyle.h1}>Na Zdrowie!</Text>
        <Text style={loginScreenStyle.h2}>Zaloguj się na swoje konto</Text>
      </View>
      <View style={loginScreenStyle.inputContainer}>
        <TextInputPersonalized placeholder="login" onChange={setLogin} />
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
