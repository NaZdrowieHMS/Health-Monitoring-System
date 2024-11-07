import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import {
  LinkButton,
  PrimaryButton,
  PersonalizedTextInput,
} from "components/atoms";
import primaryColors from "properties/colors";
import { authenticationScreenStyle } from "properties/styles";
import React, { useContext } from "react";
import { Keyboard, Text, View } from "react-native";
import { UserContext } from "services/context";

const LoginScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Login">) => {
  const [login, setLogin] = React.useState<string>("");
  const { setCurrentUser } = useContext(UserContext);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const navigateToRegisterScreen = () => {
    navigation.navigate("Choice");
  };

  const navigateToMainScreen = () => {
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
    navigation.navigate("MainScreen");
  };

  return (
    <View
      style={authenticationScreenStyle.container}
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
